import json

from django.test import TestCase

from core.models import API, Relation
from core.serializers import APISerializer


API_PATH = '/api/apis/'


class APIImplementedByViewTest(TestCase):
    def setUp(self):
        self.api1 = API.objects.create(
            api_id='api1',
            description='First API',
            organization_name='Test Organization',
            service_name='First Service',
            api_type='rest_json',
            api_authentication='none',
            is_reference_implementation=True,
            contact_email='contact@api1.com',
        )
        self.api2 = API.objects.create(
            api_id='implementer_1',
            is_reference_implementation=False,
        )
        self.api3 = API.objects.create(
            api_id='implementer_2',
            is_reference_implementation=False,
        )
        self.api4 = API.objects.create(
            api_id='fake_implementer',
            is_reference_implementation=False,
        )
        Relation.objects.create(
            name=Relation.TYPE_REFERENCE_IMPLEMENTATION,
            from_api=self.api2,
            to_api=self.api1,
        )
        Relation.objects.create(
            name=Relation.TYPE_REFERENCE_IMPLEMENTATION,
            from_api=self.api3,
            to_api=self.api1,
        )
        Relation.objects.create(
            name='SOME OTHER RELATION TYPE',
            from_api=self.api4,
            to_api=self.api1,
        )

        # Display whole JSON diffs
        self.maxDiff = None

    def test_get_implemented_by_some(self):
        response = self.client.get(API_PATH + 'api1/implemented-by')

        self.assertEqual(response.status_code, 200)

        api2_json = json.dumps(APISerializer(self.api2).data)
        api3_json = json.dumps(APISerializer(self.api3).data)
        expected = '[' + api2_json + ', ' + api3_json + ']'

        self.assertJSONEqual(response.content, expected)

    def test_get_implemented_by_none(self):
        response = self.client.get(API_PATH + 'implementer_1/implemented-by')

        self.assertEqual(response.status_code, 200)

        expected = '[]'
        self.assertJSONEqual(response.content, expected)
