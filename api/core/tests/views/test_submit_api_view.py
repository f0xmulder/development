import json
from http.client import HTTPException
from unittest.mock import patch

import requests
from django.test import TestCase

from core.tests.mocking import mock_response
from core.views import SubmitAPIView

SUBMIT_API_PATH = '/api/submit-api'
GITLAB_ACCESS_TOKEN = 'test-token'
GITLAB_PROJECT_ID = '12345'
GITLAB_URL = 'https://testurl.com'


@patch('core.views.SubmitAPIView.gitlab_access_token',
       GITLAB_ACCESS_TOKEN)
@patch('core.views.SubmitAPIView.gitlab_project_id',
       GITLAB_PROJECT_ID)
@patch('core.views.SubmitAPIView.gitlab_url',
       GITLAB_URL)
class SubmitAPIViewTest(TestCase):
    def setUp(self):
        self.valid_api_data = {
            'id': 'api1',
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

    def test_create_issue_body(self):
        actual_body = SubmitAPIView.create_issue_body(self.valid_api_data)
        expected_body = {
            'labels': 'New API',
            'title': 'Add a new API: Test Organization First Service',
            'description': f"""
We would like to add the following API:

```json
{{
    "description": "First API",
    "organization_name": "Test Organization",
    "service_name": "First Service",
    "environments": [
        {{
            "name": "production",
            "api_url": "http://production.nl",
            "documentation_url": "http://docs.production.nl"
        }}
    ]
}}
```

Thanks a lot!

The web form
"""
        }
        self.assertEqual(actual_body, expected_body)

    @patch('core.views.SubmitAPIView.create_issue_body')
    @patch('requests.post')
    def test_submit_api(self, mock_post, mock_create_body):
        mock_post.return_value = mock_response(requests.codes.created,
                                               data=json.dumps({'some': 'json'}))
        mock_body = {'mock': 'body'}
        mock_create_body.return_value = mock_body

        response = self.client.post(SUBMIT_API_PATH,
                                    data=json.dumps(self.valid_api_data),
                                    content_type='application/json')
        self.assertEqual(response.status_code, 200)

        expected_url = f'{GITLAB_URL}/api/v4/projects/{GITLAB_PROJECT_ID}/issues'
        expected_json = mock_body
        expected_headers = {
            'Content-Type': 'application/json',
            'PRIVATE-TOKEN': GITLAB_ACCESS_TOKEN,
        }
        mock_post.assert_called_with(expected_url,
                                     json=expected_json,
                                     headers=expected_headers)

    def test_submit_invalid_api(self):
        response = self.client.post(SUBMIT_API_PATH,
                                    data=json.dumps({'invalid': 'api data'}),
                                    content_type='application/json')
        self.assertEqual(response.status_code, 400)

    @patch('requests.post')
    def test_submit_gitlab_error_code(self, mock_post):
        mock_post.return_value = mock_response(404, data=json.dumps({'some': 'json'}))

        response = self.client.post(SUBMIT_API_PATH,
                                    data=json.dumps(self.valid_api_data),
                                    content_type='application/json')
        self.assertEqual(response.status_code, 500)

        response_data = json.loads(response.content)
        self.assertEqual(response_data,
                         {'detail': 'Something went wrong while posting to the GitLab API'})
