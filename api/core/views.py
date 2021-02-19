import logging
import json
import datetime

import requests
from django.utils import timezone
from django.urls import reverse
from django.template.loader import render_to_string
from django.contrib.postgres.search import SearchVector
from django.core.exceptions import ObjectDoesNotExist, ImproperlyConfigured
from django.db.models import Q, Count, F
from django.http import HttpResponse
from requests import RequestException, Timeout
from rest_framework import status
from rest_framework.exceptions import NotFound, APIException
from rest_framework.mixins import ListModelMixin, RetrieveModelMixin, CreateModelMixin
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.viewsets import GenericViewSet

from core.code import parse_code
from core.exceptions import APIStatusCodeException
from core.models import API, Relation, Environment, Event, Code, ProgrammingLanguage
from core.pagination import StandardResultsSetPagination
from core.search import get_facet_filters, get_search_filter
from core.serializers import APISerializer, EventSerializer, CodeSerializer, CodeSubmitSerializer
from core.gitlab import create_issue

REQUEST_TIMEOUT_SECONDS = 10

logger = logging.getLogger(__name__)


class APIViewSet(RetrieveModelMixin,
                 GenericViewSet):
    """ Provides a list of APIs and corresponding totals for facets

    Results can be filtered as follows

    * q=[text fragment]
    * organization_name=[organization name]
    * api_type=[api_type]
    * isReferenceImplementation=[true|false]

    """
    queryset = API.objects.with_last_session().prefetch_related(
        "badges", "environments", "referenced_apis")
    serializer_class = APISerializer
    pagination_class = StandardResultsSetPagination
    lookup_field = 'api_id'

    search_vector = SearchVector(
        'service_name',
        'description',
        'organization_name',
        'api_type',
        config='dutch'
    )
    supported_facets = ['organization_name', 'api_type']

    def list(self, request):
        queryset = self.filter_queryset(self.get_queryset())

        list_filter = Q()

        is_ref_impl_val = request.query_params.get('isReferenceImplementation')
        if is_ref_impl_val is not None:
            is_ref_impl_val = bool(['false', 'true'].index(is_ref_impl_val))
            list_filter &= Q(is_reference_implementation=is_ref_impl_val)
        search_text = request.query_params.get('q', '')
        if search_text:
            queryset = queryset.annotate(searchable=self.search_vector)
            search_filter = get_search_filter(search_text)
            list_filter &= search_filter
        else:
            search_filter = None

        facet_inputs = {f: request.query_params.getlist(f) for f in self.supported_facets}
        facet_filters = get_facet_filters(facet_inputs)
        list_filter &= Q(*facet_filters.values())

        results = queryset
        if list_filter:
            results = results.filter(list_filter)
        results = results.order_by('api_id')
        facets = self.get_facets(queryset, facet_filters, search_filter)

        return self.get_response(results, facets)

    @staticmethod
    def get_facets(queryset, facet_filters, search_filter):
        facets = {}
        for facet in APIViewSet.supported_facets:
            other_facet_filters = [
                v for k, v in facet_filters.items()
                if k != facet and v is not None]
            combined_filter = Q(*other_facet_filters)
            if search_filter:
                combined_filter &= search_filter

            term_counts = queryset \
                .values(term=F(facet)) \
                .annotate(count=Count('id', filter=combined_filter or None)) \
                .order_by('term')

            facets[facet] = {'terms': list(term_counts)}

        return facets

    def get_response(self, results_queryset, facets):
        page = self.paginate_queryset(results_queryset)
        serializer = self.get_serializer(page, many=True)
        paginated_response = self.get_paginated_response(serializer.data)

        response_data = paginated_response.data.copy()
        response_data['facets'] = facets
        return Response(response_data)


class APIImplementedByView(APIView):
    def get(self, request, api_id):
        apis = API.objects \
            .filter(relations_from__to_api=api_id,
                    relations_from__name=Relation.TYPE_REFERENCE_IMPLEMENTATION) \
            .order_by('api_id')

        serializer = APISerializer(apis, many=True)
        return Response(serializer.data)


class APIForumPostsView(APIView):
    def get(self, request, api_id):
        try:
            api = API.objects.get(api_id=api_id)
        except ObjectDoesNotExist as e:
            raise NotFound(detail='API not found') from e

        if not api.forum_url:
            raise NotFound(detail=f'API {api_id} does not have forum integration configured')
        return proxy_url(api.forum_url + '.json', 'forum integration')


class APISpecificationView(APIView):
    def get(self, request, api_id, environment):
        try:
            env_type = Environment.EnvironmentType(environment)
            env = Environment.objects.filter(name=env_type.value, api_id=api_id).get()
        except ValueError as e:
            raise NotFound(detail='Invalid environment type: ' + environment) from e
        except ObjectDoesNotExist as e:
            raise NotFound(detail=f'No environment "{environment}" for api {api_id}') from e

        if not env.specification_url:
            raise NotFound(detail=f'API {api_id} does not have a {environment} specification')
        return proxy_url(env.specification_url, 'specification')


def proxy_url(url, name):
    # pylint complains about the empty `except ValueError`
    # pylint:disable=try-except-raise
    try:
        response = requests.get(url, timeout=REQUEST_TIMEOUT_SECONDS)
        if response.status_code != status.HTTP_200_OK:
            raise APIStatusCodeException(
                detail=f'Failed to retrieve {name} URL at {url} (response code is not 200 OK): '
                       f'{response.status_code}: {response.text}',
                status_code=status.HTTP_502_BAD_GATEWAY)
    except Timeout as e:
        raise APIStatusCodeException(
            detail=f'Failed to retrieve {name} URL at {url} due to timeout',
            status_code=status.HTTP_504_GATEWAY_TIMEOUT) from e
    except ValueError:
        # ValueError indicates an invalid url or invalid arguments, that's a local/server error
        raise
    except RequestException as e:
        # A different RequestException indicates an error at the remote end
        raise APIStatusCodeException(detail=f'Failed to retrieve {name} URL: {e}',
                                     status_code=status.HTTP_502_BAD_GATEWAY) from e

    # Note: Our security middleware inserts X-Content-Type-Options=nosniff here.
    # Our current uses don't depend on the content type header, so sending nosniff unconditionally
    # is the simplest/safest option.
    return HttpResponse(response.content, content_type=response.headers.get('Content-Type'))


class SubmitAPIView(APIView):
    def post(self, request):

        # The input has no id, which it needs to be a valid API
        data_to_validate = dict(**request.data, id='temporary-id')
        serializer = APISerializer(data=data_to_validate)
        serializer.is_valid(raise_exception=True)

        context = {
            'data': request.data,
            'json_string': json.dumps(request.data, indent=4)
        }

        title = render_to_string('issues/api_title.txt', context)
        content = render_to_string('issues/api_content.txt', context)

        try:
            result = create_issue(title, content, 'New API')
        except ImproperlyConfigured as e:
            logger.error(e)
            raise APIException(detail='The Gitlab API is not properly configured')
        except Exception as e:
            logger.error(e)
            raise APIException(detail='Something went wrong while posting to the GitLab API')

        return Response(result)


class EventViewSet(GenericViewSet, ListModelMixin, CreateModelMixin):
    serializer_class = EventSerializer
    pagination_class = StandardResultsSetPagination

    def get_queryset(self):
        twentyfour_hours_ago = timezone.now() - datetime.timedelta(hours=24)
        return Event.objects.filter(start_date__gt=twentyfour_hours_ago, is_published=True)

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)

        headers = self.get_success_headers(serializer.data)
        event = serializer.data

        context = {
            'event': event,
            'manage_url': self.request.build_absolute_uri(
                reverse('admin:core_event_change', args=[event.get('id')])
            )
        }

        title = render_to_string('issues/event_title.txt', context)
        content = render_to_string('issues/event_content.txt', context)

        try:
            result = create_issue(title, content, 'New Event')
        except ImproperlyConfigured as e:
            logger.error(e)
            raise APIException(detail='The Gitlab API is not properly configured')
        except Exception as e:
            logger.error(e)
            raise APIException(detail='Something went wrong while posting to the GitLab API')

        return Response(result, status=status.HTTP_201_CREATED, headers=headers)


class CodeViewSet(GenericViewSet, ListModelMixin, CreateModelMixin):
    serializer_class = CodeSerializer
    pagination_class = StandardResultsSetPagination
    lookup_field = 'url'

    search_vector = SearchVector('owner_name', 'name', config='dutch')

    supported_facets = ['programming_languages']

    def get_queryset(self):
        return Code.objects.prefetch_related(
            "programming_languages", "related_apis").order_by(F('stars').desc(nulls_last=True))

    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())

        facet_inputs = {f: request.query_params.getlist(f) for f in self.supported_facets}
        facet_filters = get_facet_filters(facet_inputs)
        if facet_filters:
            queryset = queryset.filter(*facet_filters.values())

        search_text = self.request.query_params.get('q', '')
        if search_text:
            search_filter = get_search_filter(search_text)
            queryset = queryset.annotate(searchable=self.search_vector).filter(search_filter)

        results = queryset.distinct()

        return self.get_response(results)

    def get_response(self, results_queryset):
        page = self.paginate_queryset(results_queryset)
        serializer = self.get_serializer(page, many=True)
        paginated_response = self.get_paginated_response(serializer.data)

        response_data = paginated_response.data.copy()
        response_data['programmingLanguages'] = [
            {'id': x.id, 'name': x.name} for x in ProgrammingLanguage.objects.all().order_by(
                'name'
            )
        ]
        return Response(response_data)

    def create(self, request, *args, **kwargs):
        request.data['related_apis'] = [
            {'api_id': x['value']} for x in request.data['related_apis']
        ]
        serializer = CodeSubmitSerializer(data=request.data)
        if not serializer.is_valid():
            # The exact URL is already in the database
            raise APIStatusCodeException("de URL is eerder toegevoegd",
                                         status_code=status.HTTP_409_CONFLICT)

        parse_code(serializer.validated_data)

        return Response('Code toegevoegd', status=status.HTTP_201_CREATED)
