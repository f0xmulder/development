from decimal import Decimal
from json import JSONDecodeError

from django.test import TestCase

from core.management.commands.sync_apis import sync_apis
from core.models import API, Environment, Relation


class SyncAPIsTest(TestCase):
    def setUp(self):
        # Display whole diffs
        self.maxDiff = None

    def test_sync_apis_valid(self):
        sync_apis('core/tests/management/test-data/valid')

        actual_apis = list(API.objects.values())
        expected_apis = [
            {
                'id': 1,
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
                'contact_fax': '0031687654321',
                'contact_chat': 'https://nl-x.slack.com',
                'contact_url': '',
                'terms_government_only': True,
                'terms_pay_per_use': False,
                'terms_uptime_guarantee': Decimal('99.9'),
                'terms_support_response_time': '2 days',
            },
        ]
        self.assertEqual(actual_apis, expected_apis)

        actual_environments = list(Environment.objects.values())
        expected_environments = [
            {
                'id': 1,
                'api_id': 'company-service',
                'name': 'Productie',
                'api_url': 'Test API URL',
                'specification_url': 'Test Specification URL',
                'documentation_url': 'Test Documentation URL',
            },
            {
                'id': 2,
                'api_id': 'company-service',
                'name': 'Acceptatie',
                'api_url': 'Test Acceptance API URL',
                'specification_url': 'Test Acceptance Specification URL',
                'documentation_url': 'Test Acceptance Documentation URL',
            },
        ]
        self.assertEqual(actual_environments, expected_environments)

        actual_relations = list(Relation.objects.values())
        expected_relations = [
            {
                'id': 1,
                'name': 'reference-implementation',
                'from_api_id': 'company-service',
                'to_api_id': 'company-service',
            },
        ]
        self.assertEqual(actual_relations, expected_relations)

    def test_sync_apis_invalid_json(self):
        with self.assertRaises(JSONDecodeError):
            sync_apis('core/tests/management/test-data/invalid')
