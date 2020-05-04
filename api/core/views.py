import logging
from functools import reduce

import requests
from django.contrib.postgres.search import SearchVector, SearchQuery
from django.core.exceptions import ObjectDoesNotExist
from django.db.models import Q, Count, F
from django.http import HttpResponse
from requests import RequestException, Timeout
from rest_framework import status
from rest_framework.exceptions import NotFound, APIException
from rest_framework.mixins import RetrieveModelMixin
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.viewsets import GenericViewSet

from core.models import API, Relation, Environment
from core.pagination import StandardResultsSetPagination
from core.serializers import APISerializer

REQUEST_TIMEOUT_SECONDS = 10

logger = logging.getLogger(__name__)


class APIProxyException(APIException):
    def __init__(self, detail, status_code):
        self.status_code = status_code
        super().__init__(detail=detail)


class APIViewSet(RetrieveModelMixin,
                 GenericViewSet):
    queryset = API.objects.all()
    serializer_class = APISerializer
    pagination_class = StandardResultsSetPagination
    lookup_field = 'api_id'

    search_vector = (
        SearchVector('service_name', config='dutch') +
        SearchVector('description', config='dutch') +
        SearchVector('organization_name', config='dutch') +
        SearchVector('api_type', config='dutch')
    )
    supported_facets = ['organization_name', 'api_type']

    def list(self, request):
        queryset = self.filter_queryset(self.get_queryset()) \
            .annotate(searchable=self.search_vector)

        facet_inputs = {f: request.query_params.getlist(f) for f in self.supported_facets}
        search_text = request.query_params.get('q', '')

        facet_filters = self.get_facet_filters(facet_inputs)
        search_filter = self.get_search_filter(search_text)

        results = queryset \
            .filter(*facet_filters.values(), search_filter) \
            .order_by('api_id')
        facets = self.get_facets(queryset, facet_filters, search_filter)

        return self.get_response(results, facets)

    @staticmethod
    def get_facet_filters(facet_inputs):
        facet_filters = {}
        for facet, selected_values in facet_inputs.items():
            facet_filters[facet] = reduce(lambda query, val, f=facet: query | Q(**{f: val}),
                                          selected_values,
                                          Q())
        return facet_filters

    @staticmethod
    def get_search_filter(search_text):
        search_filter = Q()
        if search_text:
            search_filter = Q(searchable=SearchQuery(search_text, config='dutch'))

        return search_filter

    @staticmethod
    def get_facets(queryset, facet_filters, search_filter):
        facets = {}
        for facet in facet_filters.keys():
            other_facet_filters = [v for k, v in facet_filters.items() if k != facet]
            combined_filter = reduce(lambda query, val: query & Q(val),
                                     other_facet_filters,
                                     Q())
            term_counts = queryset \
                .values(term=F(facet)) \
                .annotate(count=Count('id', filter=combined_filter & search_filter))

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
            # FIXME #214: Use EnvironmentType value instead of label once database has been fixed.
            #          becomes Environment.EnvironmentType(environment)
            env_type = [e for e in Environment.EnvironmentType if e.label == environment][0]
            env = Environment.objects.filter(name=env_type.label, api_id=api_id).get()
        except IndexError as e:  # Becomes ValueError
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
            raise APIProxyException(
                detail=f'Failed to retrieve {name} URL at {url} (response code is not 200 OK): '
                       f'{response.status_code}: {response.text}',
                status_code=status.HTTP_502_BAD_GATEWAY)
    except Timeout as e:
        raise APIProxyException(
            detail=f'Failed to retrieve {name} URL at {url} due to timeout',
            status_code=status.HTTP_504_GATEWAY_TIMEOUT) from e
    except ValueError:
        # ValueError indicates an invalid url or invalid arguments, that's a local/server error
        raise
    except RequestException as e:
        # A different RequestException indicates an error at the remote end
        raise APIProxyException(detail=f'Failed to retrieve {name} URL: {e}',
                                status_code=status.HTTP_502_BAD_GATEWAY) from e

    # Note: Our security middleware inserts X-Content-Type-Options=nosniff here.
    # Our current uses don't depend on the content type header, so sending nosniff unconditionally
    # is the simplest/safest option.
    return HttpResponse(response.content, content_type=response.headers.get('Content-Type'))
