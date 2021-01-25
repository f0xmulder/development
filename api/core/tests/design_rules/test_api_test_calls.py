import os
import json

from django.db.models.signals import post_save
from django.test import TransactionTestCase

import factory
import requests_mock

from core.api_test_calls import (
    get_or_create_test_suite, get_versions, get_session, start_design_rule_session,
    get_all_sessions_urls
)
from core.models import DesignRuleResult

from .factories import APIDesignRuleTestSuiteFactory, EnvironmentFactory


def mockdata(resultfile):
    dir_path = os.path.dirname(os.path.realpath(__file__))
    with open(os.path.join(dir_path, "files", resultfile)) as json_file:
        return json_file.read()


@requests_mock.Mocker()
class ApiTestCallsTests(TransactionTestCase):
    @factory.django.mute_signals(post_save)
    def test_get_or_create_test_suite(self, mock):
        mock.post(
            'https://staging.api-test.nl/api/v1/designrule-testsuite',
            text=mockdata("get_or_create_test_suite.json")
        )

        test_suite = APIDesignRuleTestSuiteFactory(uuid=None)
        EnvironmentFactory(api=test_suite.api)

        get_or_create_test_suite(test_suite)
        test_suite.refresh_from_db()
        self.assertIsNotNone(test_suite.uuid)

    @factory.django.mute_signals(post_save)
    def test_get_all_sessions_urls(self, mock):
        mock_url = 'https://staging.api-test.nl/api/v1/designrule-testsuite/' \
            '61f4e5e7-0b22-456f-9596-951e0365bb10'
        mock.get(mock_url, text=mockdata("get_all_sessions_urls.json"))

        test_suite = APIDesignRuleTestSuiteFactory()

        response = get_all_sessions_urls(test_suite)
        test_suite.refresh_from_db()
        self.assertEqual(response, [
            "https://staging.api-test.nl/api/v1/designrule-session/{}".format(
                "f4ea925f-b394-4dd9-86de-5eff3cc9dcad"
            )
        ])

    @factory.django.mute_signals(post_save)
    def test_start_design_rule_session(self, mock):
        mock_url = 'https://staging.api-test.nl/api/v1/designrule-testsuite/' \
            '61f4e5e7-0b22-456f-9596-951e0365bb10/start_session'
        mock.post(mock_url, text=mockdata("start_design_rule_session.json"))

        test_suite = APIDesignRuleTestSuiteFactory()

        response = start_design_rule_session(test_suite, "http://specification.example.com")
        test_suite.refresh_from_db()
        self.assertEqual(response, test_suite.sessions.first())
        self.assertEqual(DesignRuleResult.objects.count(), 6)

    @factory.django.mute_signals(post_save)
    def test_get_session(self, mock):
        request_url = 'https://staging.api-test.nl/api/v1/designrule-session/' \
            'f4ea925f-b394-4dd9-86de-5eff3cc9dcad'
        compare_json = mockdata("get_session.json")
        mock.get(request_url, text=compare_json)
        test_suite = APIDesignRuleTestSuiteFactory()

        response = get_session(request_url)
        test_suite.refresh_from_db()
        self.assertEqual(response, json.loads(compare_json))

    @factory.django.mute_signals(post_save)
    def test_get_versions(self, mock):
        mock.get(
            'https://staging.api-test.nl/api/v1/designrule-testversion',
            text=mockdata("get_versions.json")
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
