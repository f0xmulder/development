import json
from unittest.mock import patch

from django.core.exceptions import ImproperlyConfigured
from django.test import TestCase
from rest_framework.exceptions import ErrorDetail

from core.tests.utils import prevent_logging

SUBMIT_API_PATH = '/api/submit-api'


class SubmitAPIViewTest(TestCase):
    def setUp(self):
        self.valid_api_data = {
            'description': 'First API',
            'organization_name': 'Test Organization',
            'service_name': 'First Service',
            'environments': [{
                'name': 'production',
                'api_url': 'http://production.nl',
                'documentation_url': 'http://docs.production.nl',
            }],
        }

        # Display whole JSON diffs
        self.maxDiff = None

    @prevent_logging
    def test_submit_invalid_api(self):
        response = self.client.post(SUBMIT_API_PATH,
                                    data=json.dumps({'invalid': 'api data'}),
                                    content_type='application/json')
        self.assertEqual(response.status_code, 400)

    @patch('core.views.create_issue')
    def test_submit_valid_api(self, mock_create_issue):
        mock_create_issue.return_value = {'id': 42}

        response = self.client.post(SUBMIT_API_PATH,
                                    data=json.dumps(self.valid_api_data),
                                    content_type='application/json')

        create_issue_args = mock_create_issue.call_args[0]

        self.assertEqual(response.data, {'id': 42})

        self.assertIn('Add a new API: Test Organization', create_issue_args[0])
        self.assertIn('Thanks a lot!\n\nThe web form', create_issue_args[1])
        self.assertIn('"description": "First API"', create_issue_args[1])
        self.assertIn('New API', create_issue_args[2])

    @prevent_logging
    @patch('core.views.create_issue')
    def test_submit_gitlab_error(self, mock_create_issue):
        mock_create_issue.side_effect = ImproperlyConfigured('Gitlab configuration error')

        response = self.client.post(SUBMIT_API_PATH,
                                    data=json.dumps(self.valid_api_data),
                                    content_type='application/json')

        self.assertEqual(response.data, {'detail': ErrorDetail(
            string='The Gitlab API is not properly configured', code='error')}
        )
