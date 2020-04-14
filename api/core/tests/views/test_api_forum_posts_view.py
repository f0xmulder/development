import json
from unittest.mock import patch

from django.test import TestCase
from requests import HTTPError

from core.models import API


API_PATH = '/api/apis/'


def mocked_requests_get(*_, **__):
    class MockResponse:
        def __init__(self, json_data, status_code):
            self.json_data = json_data
            self.status_code = status_code

        def json(self):
            return self.json_data

        def raise_for_status(self):
            pass

    return MockResponse({'some': 'random json'}, 200)


def mocked_requests_get_http_error(*_, **__):
    class MockResponseJSONError:
        def __init__(self, status_code):
            self.status_code = status_code

        def json(self):
            return self.json_data

        def raise_for_status(self):
            raise HTTPError()

    return MockResponseJSONError(404)


def mocked_requests_get_invalid_json(*_, **__):
    class MockResponseJSONError:
        def __init__(self, status_code):
            self.status_code = status_code

        def json(self):
            raise ValueError('No JSON object could be decoded')

        def raise_for_status(self):
            pass

    return MockResponseJSONError(200)


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

    @patch('requests.get',
           side_effect=mocked_requests_get)
    def test_forum_posts(self, requests_get_mock):
        del requests_get_mock  # Unused param

        response = self.client.get(API_PATH + 'api1/forum-posts')
        self.assertEqual(response.status_code, 200)

        json_response = json.loads(response.content)
        expected = {'some': 'random json'}
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

    @patch('requests.get',
           side_effect=mocked_requests_get_http_error)
    def test_http_error(self, requests_get_mock):
        del requests_get_mock  # Unused param

        response = self.client.get(API_PATH + 'api1/forum-posts')
        self.assertEqual(response.status_code, 500)

        response_data = json.loads(response.content)
        self.assertEqual(response_data, {'detail': 'Failed to get forum posts from URL'})

    @patch('requests.get',
           side_effect=mocked_requests_get_invalid_json)
    def test_invalid_json_returned(self, requests_get_mock):
        del requests_get_mock  # Unused param

        response = self.client.get(API_PATH + 'api1/forum-posts')
        self.assertEqual(response.status_code, 500)

        response_data = json.loads(response.content)
        self.assertEqual(response_data, {'detail': 'Failed to get forum posts from URL'})
