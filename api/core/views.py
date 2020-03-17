from functools import reduce

from django.contrib.postgres.search import SearchVector, SearchQuery
from django.db.models import Q, Count, F
from rest_framework.mixins import RetrieveModelMixin
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.viewsets import GenericViewSet

from core.models import API, Relation
from core.pagination import StandardResultsSetPagination
from core.serializers import APISerializer


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

    def list(self, request):
        queryset = self.filter_queryset(self.get_queryset()) \
            .annotate(searchable=APIViewSet.search_vector)

        # Input
        selected_organizations = request.query_params.getlist('organization_name')
        selected_api_types = request.query_params.getlist('api_type')
        search_text = request.query_params.get('q', '')

        # Filters
        organization_filter = reduce(lambda acc, val: acc | Q(organization_name=val),
                                     selected_organizations,
                                     Q())
        api_type_filter = reduce(lambda acc, val: acc | Q(api_type=val),
                                 selected_api_types,
                                 Q())
        search_filter = Q()
        if search_text:
            search_filter = Q(searchable=SearchQuery(search_text, config='dutch'))

        # Results
        results = queryset \
            .filter(api_type_filter, organization_filter, search_filter) \
            .order_by('api_id')

        # Facets
        api_type_terms = queryset \
            .values(term=F('api_type')) \
            .annotate(count=Count('id', filter=organization_filter & search_filter))
        organization_terms = queryset \
            .values(term=F('organization_name')) \
            .annotate(count=Count('id', filter=api_type_filter & search_filter))
        facets = {
            'api_type': {'terms': list(api_type_terms)},
            'organization_name': {'terms': list(organization_terms)},
        }

        # Response
        page = self.paginate_queryset(results)
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
