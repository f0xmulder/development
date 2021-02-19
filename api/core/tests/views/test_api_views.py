import json

from django.test import TestCase

from core.models import API
from core.serializers import APISerializer
from core.tests.utils import prevent_logging

API_PATH = '/api/apis'


class APIViewTest(TestCase):
    def setUp(self):
        self.api1 = API.objects.create(
            api_id='api1',
            description='First API',
            organization_name='Test Organization',
            service_name='First Service',
            api_type='rest_json',
            api_authentication='none',
            is_reference_implementation=False,
            contact_email='contact@api1.com',
        )
        self.api2 = API.objects.create(
            api_id='api2',
            description='Second API',
            organization_name='Other Organization',
            service_name='Better Service',
            api_type='graphql',
            api_authentication='unknown',
            is_reference_implementation=True,
            contact_email='contact@api2.com',
        )

        # Display whole JSON diffs
        self.maxDiff = None

    def test_get_single(self):
        response = self.client.get(API_PATH + '/api2')

        self.assertEqual(response.status_code, 200)

        expected = json.dumps(APISerializer(self.api2).data)

        self.assertJSONEqual(response.content, expected)

    @prevent_logging
    def test_post_not_allowed(self):
        response = self.client.post(API_PATH)

        self.assertEqual(response.status_code, 405)

    @prevent_logging
    def test_put_not_allowed(self):
        response = self.client.put(API_PATH + '/api3')

        self.assertEqual(response.status_code, 405)

    @prevent_logging
    def test_patch_not_allowed(self):
        response = self.client.patch(API_PATH + '/api3')

        self.assertEqual(response.status_code, 405)

    @prevent_logging
    def test_delete_not_allowed(self):
        response = self.client.delete(API_PATH + '/api3')

        self.assertEqual(response.status_code, 405)
