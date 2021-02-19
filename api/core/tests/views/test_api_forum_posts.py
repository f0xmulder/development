import json
from unittest.mock import patch

from django.test import TestCase

from core.models import API
from core.tests.mocking import mock_response
from core.tests.utils import prevent_logging

API_PATH = '/api/apis/'


class APIForumPostsViewTest(TestCase):

    def setUp(self):
        self.api1 = API.objects.create(
            api_id='api1',
            description='API with forum',
            forum_vendor='discourse',
            forum_url='https://geoforum.nl/c/datasets/bag',
        )
        self.api2 = API.objects.create(
            api_id='api2',
            description='API without forum',
        )
        self.api3 = API.objects.create(
            api_id='api3',
            description='API with empty forum url',
            forum_vendor='discourse',
            forum_url='',
        )

        # Display whole JSON diffs
        self.maxDiff = None

    @patch('requests.get')
    def test_forum_posts(self, mock_get):
        mock_get.return_value = mock_response(200, data="some data")

        response = self.client.get(API_PATH + 'api1/forum-posts')
        self.assertEqual(response.status_code, 200)

        self.assertEqual(response.content, b"some data")

    @prevent_logging
    def test_api_not_found(self):
        response = self.client.get(API_PATH + 'api999/forum-posts')
        self.assertEqual(response.status_code, 404)

        response_data = json.loads(response.content)
        self.assertEqual(response_data, {'detail': 'API not found'})

    @prevent_logging
    def test_empty_forum_url(self):
        response = self.client.get(API_PATH + 'api3/forum-posts')
        self.assertEqual(response.status_code, 404)

        response_data = json.loads(response.content)
        self.assertEqual(response_data,
                         {'detail': 'API api3 does not have forum integration configured'})

    @prevent_logging
    def test_no_forum(self):
        response = self.client.get(API_PATH + 'api2/forum-posts')
        self.assertEqual(response.status_code, 404)

        response_data = json.loads(response.content)
        self.assertEqual(response_data,
                         {'detail': 'API api2 does not have forum integration configured'})
