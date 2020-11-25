import os

from django.db.models.signals import post_save
from django.test import TransactionTestCase

import factory
import requests_mock

from design_rules.models import DesignRuleResult
from design_rules.tasks import create_test_suite, get_versions, get_session, start_design_rule_session, get_all_sessions_urls

from .factories import APIDesignRuleTestSuiteFactory, EnvironmentFactory


class TaskTests(TransactionTestCase):
    @factory.django.mute_signals(post_save)
    def test_create_test_suite(self):
        test_suite = APIDesignRuleTestSuiteFactory(uuid=None)
        environment = EnvironmentFactory(api=test_suite.api)

        with requests_mock.Mocker() as mock:
            dir_path = os.path.dirname(os.path.realpath(__file__))
            with open(os.path.join(dir_path, "files", "create_test_suite.json")) as json_file:
                mock.post('https://staging.api-test.nl/api/v1/designrule-testsuite', text=json_file.read())
            create_test_suite(test_suite)
        test_suite.refresh_from_db()
        self.assertIsNotNone(test_suite.uuid)

    @factory.django.mute_signals(post_save)
    def test_get_all_sessions_urls(self):
        test_suite = APIDesignRuleTestSuiteFactory()

        with requests_mock.Mocker() as mock:
            dir_path = os.path.dirname(os.path.realpath(__file__))
            with open(os.path.join(dir_path, "files", "get_all_sessions_urls.json")) as json_file:
                mock.get('https://staging.api-test.nl/api/v1/designrule-testsuite/61f4e5e7-0b22-456f-9596-951e0365bb10', text=json_file.read())
            response = get_all_sessions_urls(test_suite)
        test_suite.refresh_from_db()
        self.assertEqual(response, ["https://staging.api-test.nl/api/v1/designrule-session/f4ea925f-b394-4dd9-86de-5eff3cc9dcad"])

    @factory.django.mute_signals(post_save)
    def test_start_design_rule_session(self):
        self.maxDiff = None
        test_suite = APIDesignRuleTestSuiteFactory()

        with requests_mock.Mocker() as mock:
            dir_path = os.path.dirname(os.path.realpath(__file__))
            with open(os.path.join(dir_path, "files", "start_design_rule_session.json")) as json_file:
                mock.post('https://staging.api-test.nl/api/v1/designrule-testsuite/61f4e5e7-0b22-456f-9596-951e0365bb10/start_session', text=json_file.read())
            response = start_design_rule_session(test_suite)
        test_suite.refresh_from_db()
        self.assertEqual(response, test_suite.sessions.first())
        self.assertEqual(DesignRuleResult.objects.count(), 6)

    @factory.django.mute_signals(post_save)
    def test_get_session(self):
        test_suite = APIDesignRuleTestSuiteFactory()

        with requests_mock.Mocker() as mock:
            dir_path = os.path.dirname(os.path.realpath(__file__))
            with open(os.path.join(dir_path, "files", "get_session.json")) as json_file:
                mock.get('https://staging.api-test.nl/api/v1/designrule-session/f4ea925f-b394-4dd9-86de-5eff3cc9dcad', text=json_file.read())
            response = get_session("https://staging.api-test.nl/api/v1/designrule-session/f4ea925f-b394-4dd9-86de-5eff3cc9dcad")
        test_suite.refresh_from_db()
        self.assertEqual(response, {"uuid": "dfc631a9-fd29-4ea9-aa9c-3c513f2b6065",
    "started_at": "2020-11-18T10:44:40.304107+01:00",
    "percentage_score": "83.33",
    "results": [{"rule_type": "api_51",
      "success": True,
      "errors": [""],
      "url": "https://docs.geostandaarden.nl/api/API-Designrules/#api-51-publish-oas-at-the-base-uri-in-json-format",
      "description": "Publish up-to-date documentation in the Open API Specification (OAS) at the publicly accessible root endpoint of the API in JSON format:\nhttps://service.omgevingswet.overheid.nl/publiek/catalogus/api/raadplegen/v1\nMakes the OAS relevant to v1 of the API available. Thus, the up-to-date documentation is linked to a unique location (that is always concurrent with the features available in the API)."},
     {"rule_type": "api_09",
      "success": True,
      "errors": [""],
      "url": "https://docs.geostandaarden.nl/api/API-Designrules/#api-09-implement-custom-representation-if-supported",
      "description": "Provide a comma-separated list of field names using the query parameter fields te retrieve a custom representation. In case non-existent field names are passed, a 400 Bad Request error message is returned."},
     {"rule_type": "api_48",
      "success": False,
      "errors": ["Path: /provider-latest-badge/{uuid}/ ends with a slash",
       "Path: /provider-run-shield/{uuid}/ ends with a slash",
       "Path: /testsession-run-shield/{uuid}/ ends with a slash"],
      "url": "https://docs.geostandaarden.nl/api/API-Designrules/#api-48-leave-off-trailing-slashes-from-api-endpoints",
      "description": "URIs to retrieve collections of resources or individual resources don't include a trailing slash. A resource is only available at one endpoint/path. Resource paths end without a slash."},
     {"rule_type": "api_03",
      "success": True,
      "errors": [""],
      "url": "https://docs.geostandaarden.nl/api/API-Designrules/#api-03-only-apply-default-http-operations",
      "description": "A RESTful API is an application programming interface that supports the default HTTP operations GET, PUT, POST, PATCH and DELETE."},
     {"rule_type": "api_16",
      "success": True,
      "errors": [""],
      "url": "https://docs.geostandaarden.nl/api/API-Designrules/#api-16-use-oas-3-0-for-documentation",
      "description": "Publish specifications (documentation) as Open API Specification (OAS) 3.0 or higher."},
     {"rule_type": "api_20",
      "success": True,
      "errors": [""],
      "url": "https://docs.geostandaarden.nl/api/API-Designrules/#api-20-include-the-major-version-number-only-in-ihe-uri",
      "description": "The URI of an API should include the major version number only. The minor and patch version numbers are in the response header of the message. Minor and patch versions have no impact on existing code, but major version do."}]}
)

    @factory.django.mute_signals(post_save)
    def test_get_versions(self):
        with requests_mock.Mocker() as mock:
            dir_path = os.path.dirname(os.path.realpath(__file__))
            with open(os.path.join(dir_path, "files", "get_versions.json")) as json_file:
                mock.get('https://staging.api-test.nl/api/v1/designrule-testversion', text=json_file.read())
            response = get_versions()
        self.assertEqual(response, [
            {'id': 1, 'version': '17 januari 2020', 'name': 'Base design rules test version', 'test_rules': [{'rule_type': 'api_20'}, {'rule_type': 'api_51'}, {'rule_type': 'api_16'}, {'rule_type': 'api_03'}, {'rule_type': 'api_48'}, {'rule_type': 'api_09'}]}
        ])
