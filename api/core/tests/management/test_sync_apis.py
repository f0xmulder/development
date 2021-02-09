from copy import deepcopy
from decimal import Decimal
from json import JSONDecodeError, load as json_load
from pathlib import Path

from django.core.management import call_command
from django.test import TransactionTestCase

from core.management.commands.sync_apis import sync_apis, parse_api
from core.models import API, Environment, Relation


class SyncAPIsTest(TransactionTestCase):

    @classmethod
    def setUpClass(cls):
        with open(Path(__file__).resolve().parent
                  / "test-data" / "valid" / "company-service.json") as f:
            cls.valid_data = json_load(f)

    def setUp(self):
        # Display whole diffs
        self.maxDiff = None

    def test_sync_apis_valid(self):
        call_command('sync_apis', '--api-dir', 'core/tests/management/test-data/valid')

        expected_apis = [
            {
                'api_id': 'company-service',
                'description': 'Test Description',
                'organization_name': 'Test Organization Name',
                'service_name': 'Test Service Name',
                'api_type': 'REST/JSON',
                'api_authentication': 'API Key',
                'is_reference_implementation': False,
                'forum_vendor': 'discourse',
                'forum_url': 'https://forum.test.org',
                'contact_email': 'name@example.nl',
                'contact_phone': '0031612345678',
                'contact_url': '',
                'terms_government_only': True,
                'terms_pay_per_use': False,
                'terms_uptime_guarantee': Decimal('99.9'),
                'terms_support_response_time': 2,
            },
        ]
        actual_apis = list(API.objects.values(*(k for k in expected_apis[0])))

        self.assertEqual(actual_apis, expected_apis)

        expected_environments = [
            {
                'api_id': 'company-service',
                'name': 'production',
                'api_url': 'Test API URL',
                'specification_url': 'Test Specification URL',
                'documentation_url': 'Test Documentation URL',
            },
            {
                'api_id': 'company-service',
                'name': 'acceptance',
                'api_url': 'Test Acceptance API URL',
                'specification_url': 'Test Acceptance Specification URL',
                'documentation_url': 'Test Acceptance Documentation URL',
            },
        ]
        actual_environments = list(Environment.objects.values(
            *(k for k in expected_environments[0])))
        self.assertEqual(actual_environments, expected_environments)

        expected_relations = [
            {
                'name': 'reference-implementation',
                'from_api_id': 'company-service',
                'to_api_id': 'company-service',
            },
        ]
        actual_relations = list(Relation.objects.values(
            *(k for k in expected_relations[0])))
        self.assertEqual(actual_relations, expected_relations)

    def test_sync_apis_invalid_json(self):
        with self.assertRaises(JSONDecodeError):
            sync_apis('core/tests/management/test-data/invalid')

    def test_reference_impl(self):
        json_data = deepcopy(self.valid_data)
        json_data["is_reference_implementation"] = True
        parse_api("file_name", "company-service", json_data)
        self.assertIs(API.objects.get().is_reference_implementation, True)

    def test_unknown_keys(self):
        test_json = deepcopy(self.valid_data)
        test_json["nonsense"] = "nonsense"
        with self.assertRaises(ValueError):
            parse_api("file_name", "company-service", test_json)

        test_json = deepcopy(self.valid_data)
        test_json["terms_of_use"]["nonsense"] = "nonsense"
        with self.assertRaises(ValueError):
            parse_api("file_name", "company-service", test_json)
