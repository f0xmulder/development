from functools import reduce

from django.contrib.postgres.search import SearchVector, SearchQuery
from django.db.models import Q, Count, F
from django.shortcuts import HttpResponse
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.viewsets import ReadOnlyModelViewSet

from core.models import API, Relation
from core.serializers import APISerializer


# Create your views here.
def index(request):
    return HttpResponse('WIP Core Index')


class APIViewSet(ReadOnlyModelViewSet):
    queryset = API.objects.all().order_by('api_id')
    serializer_class = APISerializer
    lookup_field = 'api_id'


class APIImplementedByView(APIView):
    def get(self, request, api_id):
        apis = API.objects \
            .filter(relations_from__to_api=api_id,
                    relations_from__name=Relation.TYPE_REFERENCE_IMPLEMENTATION) \
            .order_by('api_id')

        serializer = APISerializer(apis, many=True)
        return Response(serializer.data)


class APISearchView(APIView):
    search_vector = (
        SearchVector('service_name', config='dutch') +
        SearchVector('description', config='dutch') +
        SearchVector('organization_name', config='dutch') +
        SearchVector('api_type', config='dutch')
    )

    def get(self, request):
        # Input
        selected_organizations = request.GET.getlist('organization_name')
        selected_api_types = request.GET.getlist('api_type')
        search_text = request.GET.get('q', '')

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

        apis = API.objects.annotate(searchable=APISearchView.search_vector)

        # Results
        results = apis.filter(api_type_filter, organization_filter, search_filter)
        results_list = APISerializer(results, many=True).data

        # Facets
        api_type_terms = apis \
            .values(term=F('api_type')) \
            .annotate(count=Count('id', filter=organization_filter & search_filter))
        organization_terms = apis \
            .values(term=F('organization_name')) \
            .annotate(count=Count('id', filter=api_type_filter & search_filter))
        facets = {
            'api_type': {'terms': list(api_type_terms)},
            'organization_name': {'terms': list(organization_terms)},
        }

        # Response
        response = {
            'facets': facets,
            'apis': results_list,
        }

        return Response(response)
