from unittest.mock import patch
import json
from datetime import datetime
import pytz

from django.core.management import call_command
from django.test import TransactionTestCase

from core.code import parse_code
from core.models import Code, ProgrammingLanguage
from core.tests.mocking import mock_response


class CodeSharingTest(TransactionTestCase):
    reset_sequences = True

    def setUp(self):
        # Load API test data
        call_command('sync_apis', '--api-dir', 'core/tests/management/test-data/valid')
        # Display whole diffs
        self.maxDiff = None

    @patch('requests.get')
    def test_gitlab_repository(self, mock_get):
        test_data = {
            # Mock data for the first request
            "mock1_data": {
                "namespace": {"full_path": "commonground"},
                "name": "developer.overheid.nl",
                "web_url": "https://gitlab.com/commonground/developer.overheid.nl",
                "description": (
                    "A portal that provides an overview of all API’s within the Dutch "
                    "government. https://developer.overheid.nl"
                ),
                "last_activity_at": "2020-10-27T13:32:13Z",
                "star_count": 9,
            },
            # Mock data for the second request
            "mock2_data": {
                "Python": 1,
                "JavaScript": 2,
            },
            # code_data
            "code_data": {
                'url': 'https://gitlab.com/commonground/developer.overheid.nl/',
                'related_apis': [{'api_id': 'company-service'}],
            },
            # expected_code
            "expected_code": {
                'id': 1,
                'source': 'GitLab repository',
                'owner_name': 'commonground',
                'name': 'developer.overheid.nl',
                'url': 'https://gitlab.com/commonground/developer.overheid.nl',
                'description': (
                    'A portal that provides an overview of all API’s within the Dutch '
                    'government. https://developer.overheid.nl'
                ),
                'last_change': (
                    pytz.timezone('UTC').localize(datetime(2020, 10, 27, 13, 32, 13))
                ),
                'stars': 9,
            }
        }

        self.run_test(test_data, mock_get)

    @patch('requests.get')
    def test_gitlab_snippet(self, mock_get):
        test_data = {
            # Mock data for the first request
            "mock1_data": {
                "author": {"username": "commonground"},
                "title": "small code test snippet",
                "web_url": (
                    "https://gitlab.com/commonground/developer.overheid.nl/-/snippets/1837288"
                ),
                "description": "This a small test GitLab snippet with some code",
                "updated_at": "2020-09-27T13:32:13Z",
            },
            "mock2_data": {},
            # code_data
            "code_data": {
                'url': (
                    'https://gitlab.com/commonground/developer.overheid.nl/-/snippets/1837288'
                ),
                'related_apis': [{'api_id': 'company-service'}],
            },
            # expected_code
            "expected_code": {
                'id': 1,
                'source': 'GitLab snippet',
                'owner_name': 'commonground',
                'name': 'small code test snippet',
                'url': (
                    'https://gitlab.com/commonground/developer.overheid.nl/-/snippets/1837288'
                ),
                'description': 'This a small test GitLab snippet with some code',
                'last_change': (
                    pytz.timezone('UTC').localize(datetime(2020, 9, 27, 13, 32, 13))
                ),
                'stars': None
            }
        }

        self.run_test(test_data, mock_get)

    @patch('requests.get')
    def test_github_repository(self, mock_get):
        test_data = {
            # Mock data for the first request
            "mock1_data": {
                "owner": {"login": "githubtraining"},
                "name": "training-manual",
                "html_url": (
                    "https://github.com/githubtraining/training-manual"
                ),
                "description": (
                    "Home of the words in the GitHub Training Manual and teaching scripts."
                ),
                "updated_at": "2020-10-27T13:32:13Z",
                "stargazers_count": 18,
            },
            # Mock data for the second request
            "mock2_data": {
                "Python": 1,
                "JavaScript": 2,
            },
            # code_data
            "code_data": {
                'url': 'https://github.com/githubtraining/training-manual',
                'related_apis': [{'api_id': 'company-service'}],
            },
            # expected_code
            "expected_code": {
                'id': 1,
                'source': 'GitHub repository',
                'owner_name': 'githubtraining',
                'name': 'training-manual',
                'url': 'https://github.com/githubtraining/training-manual',
                'description': (
                    'Home of the words in the GitHub Training Manual and teaching scripts.'
                ),
                'last_change': (
                    pytz.timezone('UTC').localize(datetime(2020, 10, 27, 13, 32, 13))
                ),
                'stars': 18
            }
        }

        self.run_test(test_data, mock_get)

    @patch('requests.get')
    def test_github_gist(self, mock_get):
        test_data = {
            # Mock data for the first request
            "mock1_data": {
                "owner": {"login": "testuser"},
                "files": {
                    "training-gist.py": {"language": "Python"},
                    "training-gist2.py": {"language": "JavaScript"},
                },
                "html_url": (
                    "https://gist.github.com/testuser/447c63f8be4440752a59c6e9370ab747"
                ),
                "description": (
                    "Home of the words in the GitHub Training Manual and teaching scripts."
                ),
                "updated_at": "2020-10-27T13:32:13Z",
            },
            # Mock data for the second request
            "mock2_data": {},
            # code_data
            "code_data": {
                'url': 'https://gist.github.com/testuser/447c63f8be4440752a59c6e9370ab747',
                'related_apis': [{'api_id': 'company-service'}],
            },
            # expected_code
            "expected_code": {
                'id': 1,
                'source': 'GitHub gist',
                'owner_name': 'testuser',
                'name': 'training-gist.py',
                'url': 'https://gist.github.com/testuser/447c63f8be4440752a59c6e9370ab747',
                'description': (
                    'Home of the words in the GitHub Training Manual and teaching scripts.'
                ),
                'last_change': (
                    pytz.timezone('UTC').localize(datetime(2020, 10, 27, 13, 32, 13))
                ),
                'stars': None
            }
        }

        self.run_test(test_data, mock_get)

    def run_test(self, test_data, mock_get):
        # Some tests have two requests.get calls
        mock_get.side_effect = [
            mock_response(
                200,
                data=json.dumps(test_data['mock1_data']),
                content_type='application/json'
            ),
            mock_response(
                200,
                data=json.dumps(test_data['mock2_data']),
                content_type='application/json'
            )
        ]

        parse_code(test_data['code_data'])

        actual_code = list(Code.objects.values())[0]

        self.assertEqual(actual_code, test_data['expected_code'])

        programming_languages = [x['name'] for x in list(ProgrammingLanguage.objects.values())]
        if programming_languages:
            self.assertEqual(programming_languages, ['Python', 'JavaScript'])
