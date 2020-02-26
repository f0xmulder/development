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
