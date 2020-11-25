import os
import json

from django.db.models.signals import post_save
from django.test import TransactionTestCase

import factory
import requests_mock

from design_rules.models import DesignRuleResult
from design_rules.tasks import (
    create_test_suite, get_versions, get_session, start_design_rule_session,
    get_all_sessions_urls
)

from .factories import APIDesignRuleTestSuiteFactory, EnvironmentFactory


class TaskTests(TransactionTestCase):
    @factory.django.mute_signals(post_save)
    def test_create_test_suite(self):
        test_suite = APIDesignRuleTestSuiteFactory(uuid=None)
        environment = EnvironmentFactory(api=test_suite.api)

        with requests_mock.Mocker() as mock:
            dir_path = os.path.dirname(os.path.realpath(__file__))
            with open(os.path.join(dir_path, "files", "create_test_suite.json")) as json_file:
                mock.post(
                    'https://staging.api-test.nl/api/v1/designrule-testsuite',
                    text=json_file.read()
                )
            create_test_suite(test_suite)
        test_suite.refresh_from_db()
        self.assertIsNotNone(test_suite.uuid)

    @factory.django.mute_signals(post_save)
    def test_get_all_sessions_urls(self):
        mock_url = 'https://staging.api-test.nl/api/v1/designrule-testsuite/' \
            '61f4e5e7-0b22-456f-9596-951e0365bb10'
        test_suite = APIDesignRuleTestSuiteFactory()

        with requests_mock.Mocker() as mock:
            dir_path = os.path.dirname(os.path.realpath(__file__))
            with open(os.path.join(dir_path, "files", "get_all_sessions_urls.json")) as json_file:
                mock.get(mock_url, text=json_file.read())
            response = get_all_sessions_urls(test_suite)
        test_suite.refresh_from_db()
        self.assertEqual(response, [
            "https://staging.api-test.nl/api/v1/designrule-session/{}".format(
                "f4ea925f-b394-4dd9-86de-5eff3cc9dcad"
            )
        ])

    @factory.django.mute_signals(post_save)
    def test_start_design_rule_session(self):
        mock_url = 'https://staging.api-test.nl/api/v1/designrule-testsuite/' \
            '61f4e5e7-0b22-456f-9596-951e0365bb10/start_session'
        test_suite = APIDesignRuleTestSuiteFactory()

        with requests_mock.Mocker() as mock:
            dir_path = os.path.dirname(os.path.realpath(__file__))
            file_location = os.path.join(dir_path, "files", "start_design_rule_session.json")
            with open(file_location) as json_file:
                mock.post(mock_url, text=json_file.read())
            response = start_design_rule_session(test_suite)
        test_suite.refresh_from_db()
        self.assertEqual(response, test_suite.sessions.first())
        self.assertEqual(DesignRuleResult.objects.count(), 6)

    @factory.django.mute_signals(post_save)
    def test_get_session(self):
        request_url = 'https://staging.api-test.nl/api/v1/designrule-session/' \
            'f4ea925f-b394-4dd9-86de-5eff3cc9dcad'
        test_suite = APIDesignRuleTestSuiteFactory()

        with requests_mock.Mocker() as mock:
            dir_path = os.path.dirname(os.path.realpath(__file__))
            with open(os.path.join(dir_path, "files", "get_session.json")) as json_file:
                compare_json = json_file.read()
                mock.get(request_url, text=compare_json)
            response = get_session(request_url)
        test_suite.refresh_from_db()
        self.assertEqual(response, json.loads(compare_json))

    @factory.django.mute_signals(post_save)
    def test_get_versions(self):
        with requests_mock.Mocker() as mock:
            dir_path = os.path.dirname(os.path.realpath(__file__))
            with open(os.path.join(dir_path, "files", "get_versions.json")) as json_file:
                mock.get(
                    'https://staging.api-test.nl/api/v1/designrule-testversion',
                    text=json_file.read()
                )
            response = get_versions()
        self.assertEqual(response, [
            {
                'id': 1,
                'version': '17 januari 2020',
                'name': 'Base design rules test version',
                'test_rules': [
                    {'rule_type': 'api_20'},
                    {'rule_type': 'api_51'},
                    {'rule_type': 'api_16'},
                    {'rule_type': 'api_03'},
                    {'rule_type': 'api_48'},
                    {'rule_type': 'api_09'}
                ]
            }
        ])
