import json
from unittest.mock import patch

from django.test import TestCase
from requests import HTTPError

from core.models import API
from core.tests.mocking import mock_response

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

        # Display whole JSON diffs
        self.maxDiff = None

    @patch('requests.get')
    def test_forum_posts(self, mock_get):
        mock_get.return_value = mock_response(200, json_data={'some': 'json'})

        response = self.client.get(API_PATH + 'api1/forum-posts')
        self.assertEqual(response.status_code, 200)

        json_response = json.loads(response.content)
        expected = {'some': 'json'}
        self.assertEqual(json_response, expected)

    def test_api_not_found(self):
        response = self.client.get(API_PATH + 'api999/forum-posts')
        self.assertEqual(response.status_code, 404)

        response_data = json.loads(response.content)
        self.assertEqual(response_data, {'detail': 'API not found'})

    def test_no_forum(self):
        response = self.client.get(API_PATH + 'api2/forum-posts')
        self.assertEqual(response.status_code, 404)

        response_data = json.loads(response.content)
        self.assertEqual(response_data, {'detail': 'Forum integration not found'})

    @patch('requests.get')
    def test_http_error(self, mock_get):
        mock_get.return_value = mock_response(404, status_exception=HTTPError('404, oops'))

        response = self.client.get(API_PATH + 'api1/forum-posts')
        self.assertEqual(response.status_code, 500)

        response_data = json.loads(response.content)
        self.assertEqual(response_data, {'detail': 'Failed to get forum posts from URL'})

    @patch('requests.get')
    def test_invalid_json_returned(self, mock_get):
        mock_get.return_value = mock_response(200, json_data=None)

        response = self.client.get(API_PATH + 'api1/forum-posts')
        self.assertEqual(response.status_code, 500)

        response_data = json.loads(response.content)
        self.assertEqual(response_data, {'detail': 'Failed to get forum posts from URL'})
