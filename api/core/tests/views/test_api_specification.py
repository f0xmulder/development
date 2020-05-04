import json
from unittest.mock import patch

from django.test import TestCase

from core.models import API, Environment
from core.tests.mocking import mock_response


API_PATH = '/api/apis/'


class APISpecificationViewTest(TestCase):
    def setUp(self):
        self.api1 = API.objects.create(
            api_id='api1',
            description='API with production and demo spec',
        )
        Environment.objects.create(
            api=self.api1,
            name='Productie',
            specification_url='https://api.kadaster.nl/tms/v1/terugmeldingen-apidoc'
        )
        Environment.objects.create(
            api=self.api1,
            name='Demo',
            specification_url='https://api.kadaster.nl/tms/v1/terugmeldingen-apidoc'
        )

        self.api2 = API.objects.create(
            api_id='api2',
            description='API with empty production spec url',
        )
        Environment.objects.create(
            api=self.api2,
            name='Productie',
            specification_url=''
        )

        # Display whole JSON diffs
        self.maxDiff = None

    @patch('requests.get')
    def test_production(self, mock_get):
        mock_get.return_value = mock_response(200, data="some data")

        response = self.client.get(API_PATH + 'api1/Productie/specification')
        self.assertEqual(response.status_code, 200)

        self.assertEqual(response.content, b"some data")

    @patch('requests.get')
    def test_demo(self, mock_get):
        mock_get.return_value = mock_response(200, data="some data")

        response = self.client.get(API_PATH + 'api1/Demo/specification')
        self.assertEqual(response.status_code, 200)

        self.assertEqual(response.content, b"some data")

    def test_invalid_environment(self):
        response = self.client.get(API_PATH + 'api1/Foobar/specification')
        self.assertEqual(response.status_code, 404)

        response_data = json.loads(response.content)
        self.assertEqual(response_data, {'detail': 'Invalid environment type: Foobar'})

    def test_api_not_found(self):
        response = self.client.get(API_PATH + 'api999/Productie/specification')
        self.assertEqual(response.status_code, 404)

        response_data = json.loads(response.content)
        self.assertEqual(response_data, {'detail': 'No environment "Productie" for api api999'})

    def test_environment_not_found(self):
        response = self.client.get(API_PATH + 'api1/Acceptatie/specification')
        self.assertEqual(response.status_code, 404)

        response_data = json.loads(response.content)
        self.assertEqual(response_data, {'detail': 'No environment "Acceptatie" for api api1'})

    def test_empty_specification_url(self):
        response = self.client.get(API_PATH + 'api2/Productie/specification')
        self.assertEqual(response.status_code, 404)

        response_data = json.loads(response.content)
        self.assertEqual(response_data,
                         {'detail': 'API api2 does not have a Productie specification'})
