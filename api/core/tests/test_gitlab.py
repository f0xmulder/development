from unittest.mock import patch

from django.core.exceptions import ImproperlyConfigured
from django.test import TestCase
from django.test.utils import override_settings
from core.gitlab import create_issue
from core.tests.mocking import mock_response

SETTINGS = {
    'ACCESS_TOKEN': 'test-token',
    'PROJECT_ID': '12345',
    'URL': 'https://testurl.com'
}

INVALID_SETTINGS = {
    'ACCESS_TOKEN': 'test-token',
    'PROJECT_ID': '',
    'URL': 'https://testurl.com'
}


class Gitlab(TestCase):
    @override_settings(GITLAB=INVALID_SETTINGS)
    def test_create_issue_without_settings(self):
        with self.assertRaises(ImproperlyConfigured, msg='Gitlab project id is missing.'):
            create_issue('title', 'body', 'label')

    @patch('requests.post')
    @override_settings(GITLAB=SETTINGS)
    def test_create_issue(self, mock_post):
        mock_post.return_value = mock_response(
            200,
            data='["some data"]',
            content_type='application/json'
        )

        response_json = create_issue('title', 'body', 'label')
        self.assertEqual(response_json, ["some data"])
