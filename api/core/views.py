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
