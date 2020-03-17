from collections import OrderedDict

from django.test import TestCase
from rest_framework.exceptions import NotFound
from rest_framework.response import Response
from rest_framework.test import APIRequestFactory
from rest_framework.views import APIView

from core.models import API
from core.pagination import StandardResultsSetPagination
from core.serializers import APISerializer

API_PATH = '/api/apis'
ROWS_PER_PAGE_DEFAULT = 10


class StandardResultsSetPaginationTest(TestCase):
    def setUp(self):
        self.api1 = API.objects.create(
            api_id='kad1',
            service_name='Eerste Kadaster',
            description='Originele Kadaster API',
            organization_name='Het bureau',
            api_type='rest_json',
            api_authentication='none',
            is_reference_implementation=False,
            contact_email='contact@api1.com',
        )
        self.api2 = API.objects.create(
            api_id='kad2',
            service_name='Tweede Kadaster',
            description='Nieuwe Kadaster API',
            organization_name='De staat',
            api_type='graphql',
            api_authentication='unknown',
            is_reference_implementation=True,
            contact_email='contact@api2.com',
        )
        self.api3 = API.objects.create(
            api_id='vuil',
            service_name='De eerste echte vuilnisbakken API',
            description='Alle bakken die aan de openbare weg staan',
            organization_name='De staat',
            api_type='rest_json',
            api_authentication='none',
            is_reference_implementation=False,
            contact_email='contact@amsterdam.com',
        )

        self.factory = APIRequestFactory()
        # Display whole JSON diffs
        self.maxDiff = None

    def get_paginated_response(self, paginator, wsgi_request, queryset):
        rest_request = APIView().initialize_request(wsgi_request)

        # Call the paginator's methods in the expected way,
        # e.g. see rest_framework.mixins.ListModelMixin.
        page = paginator.paginate_queryset(queryset, rest_request)
        data = APISerializer(page, many=True).data
        return paginator.get_paginated_response(data)

    def test_single_page(self):
        paginator = StandardResultsSetPagination()
        request = self.factory.get(API_PATH + '?page=1')
        queryset = API.objects.order_by('api_id')

        response = self.get_paginated_response(paginator, request, queryset)

        expected_results = [self.api1, self.api2, self.api3]
        expected = Response(OrderedDict([
            ('page', 1),
            ('rowsPerPage', ROWS_PER_PAGE_DEFAULT),
            ('totalResults', 3),
            ('results', APISerializer(expected_results, many=True).data)
        ]))

        self.assertEqual(response.data, expected.data)

    def test_custom_page_size(self):
        paginator = StandardResultsSetPagination()
        request = self.factory.get(API_PATH + '?page=2&rowsPerPage=2')
        queryset = API.objects.order_by('api_id')

        response = self.get_paginated_response(paginator, request, queryset)

        expected_results = [self.api3]
        expected = Response(OrderedDict([
            ('page', 2),
            ('rowsPerPage', 2),
            ('totalResults', 3),
            ('results', APISerializer(expected_results, many=True).data)
        ]))

        self.assertEqual(response.data, expected.data)

    def test_invalid_page_size(self):
        paginator = StandardResultsSetPagination()
        request = self.factory.get(API_PATH + '?rowsPerPage=NOT_A_NUMBER')
        queryset = API.objects.order_by('api_id')

        response = self.get_paginated_response(paginator, request, queryset)

        expected_results = [self.api1, self.api2, self.api3]
        expected = Response(OrderedDict([
            ('page', 1),
            ('rowsPerPage', ROWS_PER_PAGE_DEFAULT),
            ('totalResults', 3),
            ('results', APISerializer(expected_results, many=True).data)
        ]))

        self.assertEqual(response.data, expected.data)

    def test_page_out_of_bounds(self):
        paginator = StandardResultsSetPagination()
        request = self.factory.get(API_PATH + '?page=2')
        queryset = API.objects.order_by('api_id')

        with self.assertRaises(NotFound):
            self.get_paginated_response(paginator, request, queryset)
