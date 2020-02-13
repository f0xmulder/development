from core.models import API
from core.serializers import APISerializer
from django.shortcuts import HttpResponse
from rest_framework import viewsets


# Create your views here.
def index(request):
    return HttpResponse('WIP Core Index')


class APIViewSet(viewsets.ModelViewSet):
    queryset = API.objects.all().order_by('api_id')
    serializer_class = APISerializer
    lookup_field = 'api_id'
