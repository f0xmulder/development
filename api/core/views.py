from django.contrib.postgres.search import SearchVector, SearchQuery
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
    def get(self, request):
        search_text = request.GET.get('q', '')

        apis = API.objects

        if search_text:
            search_vector = (
                SearchVector('service_name', config='dutch') +
                SearchVector('description', config='dutch') +
                SearchVector('organization_name', config='dutch') +
                SearchVector('api_type', config='dutch')
            )

            apis = apis \
                .annotate(searchable=search_vector) \
                .filter(searchable=SearchQuery(search_text, config='dutch'))

        serializer = APISerializer(apis, many=True)
        return Response(serializer.data)
