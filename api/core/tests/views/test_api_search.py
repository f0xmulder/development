import json

from django.test import TestCase

from core.models import API
from core.serializers import APISerializer


API_PATH = '/api/apis/search'


class APISearchTest(TestCase):
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

        # Display whole JSON diffs
        self.maxDiff = None

    def run_search_test(self, search_text, expected_apis):
        response = self.client.get(API_PATH + '?q=' + search_text)

        self.assertEqual(response.status_code, 200)

        api_jsons = [json.dumps(APISerializer(api).data) for api in expected_apis]
        expected = '[' + ', '.join(api_jsons) + ']'

        self.assertJSONEqual(response.content, expected)

    def test_no_params(self):
        self.run_search_test('', [self.api1, self.api2])

    def test_search_name(self):
        self.run_search_test('Tweede', [self.api2])

    def test_search_description(self):
        self.run_search_test('Originele', [self.api1])

    def test_search_org_name(self):
        self.run_search_test('Bureau', [self.api1])

    def test_search_api_type(self):
        self.run_search_test('GraphQL', [self.api2])
