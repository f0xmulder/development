import json
from collections import OrderedDict
from datetime import datetime
from decimal import Decimal
from operator import itemgetter
import pytz

from django.test import TestCase
from rest_framework.exceptions import ErrorDetail

from core.models import (
    API, Badge, Environment, DesignRuleSession, APIDesignRuleTestSuite, DesignRuleResult,
    Organization,
)
from core.serializers import APISerializer

DEFAULT_SCORES = {
    'has_contact_details': False,
    'has_documentation': False,
    'has_specification': False,
    'provides_sla': False,
}

REQUIRED_ERROR = 'required'
BLANK_ERROR = 'blank'
INVALID_ERROR = 'invalid'
INVALID_CHOICE_ERROR = 'invalid_choice'
MIN_VALUE_ERROR = 'min_value'


def replace_errors_with_codes(obj):
    if isinstance(obj, dict):
        return {k: replace_errors_with_codes(v) for k, v in obj.items()}

    if isinstance(obj, list):
        return [replace_errors_with_codes(v) for v in obj]

    if isinstance(obj, ErrorDetail):
        return obj.code

    return obj


class APISerializerTest(TestCase):
    def setUp(self):
        # Display whole diffs
        self.maxDiff = None

    def assert_serializer_has_errors(self, serializer, expected_error_codes):
        def format_obj(obj):
            return json.dumps(obj, indent=4)

        self.assertFalse(
            serializer.is_valid(),
            f'Expected errors: {format_obj(expected_error_codes)};\n'
            f'Instead got validated_data: {format_obj(serializer.validated_data)}'
        )

        actual_error_codes = replace_errors_with_codes(serializer.errors)
        self.assertDictEqual(actual_error_codes, expected_error_codes)

    def test_serialize_own_fields(self):
        api = API.objects.create(
            api_id='api1',
            description='First API',
            organization=Organization.objects.create(
                organization_name='Test Organization', organization_oin='00001234567890123456'),
            service_name='First Service',
            api_type='rest_json',
            api_authentication='api_key',
            is_reference_implementation=False,
            contact_email='contact@api1.com',
            contact_phone='0612345678',
            contact_url='mywebsite.com',
            terms_government_only=False,
            terms_pay_per_use=True,
            terms_uptime_guarantee=1.0,
            terms_support_response_time=2,
            forum_vendor='discourse',
            forum_url='mydiscourse.com',
        )

        actual = APISerializer(api).data
        expected = {
            'id': 'api1',
            'description': 'First API',
            'organization_name': 'Test Organization',
            'organization_oin': '00001234567890123456',
            'service_name': 'First Service',
            'api_type': 'rest_json',
            'api_authentication': 'api_key',
            'is_reference_implementation': False,
            'badges': [],
            'referenced_apis': [],
            'related_code': [],
            'environments': [],
            'contact': OrderedDict({
                'email': 'contact@api1.com',
                'phone': '0612345678',
                'url': 'mywebsite.com',
            }),
            'terms_of_use': OrderedDict({
                'government_only': False,
                'pay_per_use': True,
                'uptime_guarantee': '1.000000',
                'support_response_time': 2,
            }),
            'forum': OrderedDict({
                'vendor': 'discourse',
                'url': 'mydiscourse.com',
            }),
            'scores': OrderedDict({
                'has_documentation': False,
                'has_specification': False,
                'has_contact_details': True,
                'provides_sla': True,
            }),
        }

        self.assertDictEqual(actual, expected)

    def test_serialize_empty_api(self):
        api = API.objects.create()

        actual = APISerializer(api).data
        expected_api = {
            'id': '',
            'description': '',
            'organization_name': '',
            'service_name': '',
            'api_type': 'unknown',
            'api_authentication': 'unknown',
            'is_reference_implementation': False,
            'badges': [],
            'referenced_apis': [],
            'related_code': [],
            'environments': [],
            'contact': OrderedDict({
                'email': '',
                'phone': '',
                'url': '',
            }),
            'terms_of_use': OrderedDict({
                'government_only': None,
                'pay_per_use': None,
                'uptime_guarantee': None,
                'support_response_time': None,
            }),
            'scores': OrderedDict({
                'has_documentation': False,
                'has_specification': False,
                'has_contact_details': False,
                'provides_sla': False,
            }),
        }

        self.assertDictEqual(actual, expected_api)

    def test_serialize_badges(self):
        badge1 = Badge.objects.create(name='Golden API 2019')
        badge2 = Badge.objects.create(name='Silver API 2020')
        api = API.objects.create(api_id='api1')
        api.badges.set([badge1, badge2])

        actual_badges = APISerializer(api).data['badges']
        expected_badges = [
            'Golden API 2019',
            'Silver API 2020',
        ]

        self.assertSetEqual(set(actual_badges), set(expected_badges))

    def test_serialize_environments(self):
        api = API.objects.create(api_id='api1')
        Environment.objects.create(
            name='production',
            api_url='https://mysite.com/api',
            specification_url='https://mysite.com/spec',
            documentation_url='https://mysite.com/docs',
            api=api,
        )
        Environment.objects.create(
            name='demo',
            api_url='https://demo.mysite.com/api',
            api=api,
        )

        actual_environments = {
            e["name"]: e for e in APISerializer(api).data['environments']}
        expected_environments = {
            "demo": OrderedDict([
                ('name', 'demo'),
                ('api_url', 'https://demo.mysite.com/api'),
                ('specification_url', ''),
                ('documentation_url', ''),
            ]),
            "production": OrderedDict([
                ('name', 'production'),
                ('api_url', 'https://mysite.com/api'),
                ('specification_url', 'https://mysite.com/spec'),
                ('documentation_url', 'https://mysite.com/docs'),
            ]),
        }

        self.assertEqual(len(actual_environments), len(expected_environments))
        self.assertDictEqual(actual_environments, expected_environments)

    def test_serialize_design_rule_scores(self):
        api = API.objects.create(api_id='api1')
        suite = APIDesignRuleTestSuite.objects.create(api=api)
        ams = pytz.timezone("Europe/Amsterdam")
        # Older session, should be ignored
        DesignRuleSession.objects.create(
            test_suite=suite,
            started_at=ams.localize(datetime(2019, 1, 1)),
            percentage_score=0,
            test_version="one",
        )
        newer_session = DesignRuleSession.objects.create(
            test_suite=suite,
            started_at=ams.localize(datetime(2020, 1, 1)),
            percentage_score=0.5,
            test_version="one",
        )
        DesignRuleResult.objects.create(
            session=newer_session,
            rule_type_url='https://www.example.com',
            rule_type_name='Rule 1',
            rule_type_description='Make a good API',
            success=True,
        )
        DesignRuleResult.objects.create(
            session=newer_session,
            rule_type_url='https://www.example.com',
            rule_type_name='Rule 2',
            rule_type_description='Make a beautiful API',
            success=False,
            errors=[
                'Mistake 1',
                'Mistake 2',
            ],
        )

        actual_scores = APISerializer(api).data['design_rule_scores']
        expected_scores = OrderedDict([
            ('started_at', '2020-01-01T00:00:00+01:00'),
            ('percentage_score', '0.50'),
            ('test_version', 'one'),
            ('results', [
                OrderedDict([
                    ('rule_type_url', 'https://www.example.com'),
                    ('rule_type_name', 'Rule 2'),
                    ('rule_type_description', 'Make a beautiful API'),
                    ('success', False),
                    ('errors', ['Mistake 1', 'Mistake 2'])
                ]),
                OrderedDict([
                    ('rule_type_url', 'https://www.example.com'),
                    ('rule_type_name', 'Rule 1'),
                    ('rule_type_description', 'Make a good API'),
                    ('success', True),
                    ('errors', None)
                ]),
            ]),
        ])

        def order_results(score):
            # utility function to normalize items for comparison
            score["results"].sort(key=itemgetter("rule_type_name"))
            return score

        self.assertDictEqual(
            order_results(actual_scores), order_results(expected_scores))

    def test_serialize_design_rule_scores_no_suite(self):
        api = API.objects.create(api_id='api1')

        self.assertNotIn('design_rule_scores', APISerializer(api).data)

    def test_serialize_design_rule_scores_no_sessions(self):
        api = API.objects.create(api_id='api1')
        APIDesignRuleTestSuite.objects.create(api=api)

        self.assertNotIn('design_rule_scores', APISerializer(api).data)

    def test_scores_empty(self):
        api = API.objects.create(api_id='api1')

        actual_scores = APISerializer(api).data['scores']
        expected_scores = DEFAULT_SCORES

        self.assertDictEqual(actual_scores, expected_scores)

    def test_scores_mail(self):
        api = API.objects.create(contact_email='me@mail.com')

        actual_scores = APISerializer(api).data['scores']
        expected_scores = dict(DEFAULT_SCORES, has_contact_details=True)

        self.assertDictEqual(actual_scores, expected_scores)

    def test_scores_phone(self):
        api = API.objects.create(contact_phone='0612345678')

        actual_scores = APISerializer(api).data['scores']
        expected_scores = dict(DEFAULT_SCORES, has_contact_details=True)

        self.assertDictEqual(actual_scores, expected_scores)

    def test_scores_site(self):
        api = API.objects.create(contact_url='mysite.com')

        actual_scores = APISerializer(api).data['scores']
        expected_scores = dict(DEFAULT_SCORES, has_contact_details=True)

        self.assertDictEqual(actual_scores, expected_scores)

    def test_scores_documentation(self):
        api = API.objects.create(api_id='api1')
        Environment.objects.create(
            name='production',
            documentation_url='https://mysite.com/docs',
            api=api,
        )

        actual_scores = APISerializer(api).data['scores']
        expected_scores = dict(DEFAULT_SCORES, has_documentation=True)

        self.assertDictEqual(actual_scores, expected_scores)

    def test_scores_specification(self):
        api = API.objects.create(api_id='api1')
        Environment.objects.create(
            name='production',
            specification_url='https://mysite.com/spec',
            api=api,
        )

        actual_scores = APISerializer(api).data['scores']
        expected_scores = dict(DEFAULT_SCORES, has_specification=True)

        self.assertDictEqual(actual_scores, expected_scores)

    def test_scores_sla(self):
        api = API.objects.create(
            terms_support_response_time=7,
            terms_uptime_guarantee=0.99,
        )

        actual_scores = APISerializer(api).data['scores']
        expected_scores = dict(DEFAULT_SCORES, provides_sla=True)

        self.assertDictEqual(actual_scores, expected_scores)

    def test_deserialize_own_fields(self):
        input_data = {
            'id': 'api1',
            'description': 'First API',
            'organization_name': 'Test Organization',
            'organization_oin': '00001234567890123456',
            'service_name': 'First Service',
            'api_type': 'rest_json',
            'api_authentication': 'api_key',
            'is_reference_implementation': False,
            'referenced_apis': [],
            'environments': [
                {
                    'name': 'production',
                    'api_url': 'http://production.nl',
                },
            ],
            'contact': {
                'email': 'contact@api1.com',
                'phone': '0612345678',
                'url': 'mywebsite.com',
            },
            'terms_of_use': {
                'government_only': False,
                'pay_per_use': True,
                'uptime_guarantee': 1.0,
                'support_response_time': 2,
            },
            'forum': {
                'vendor': 'discourse',
                'url': 'http://mydiscourse.com',
            },
        }

        serializer = APISerializer(data=input_data)
        self.assertTrue(serializer.is_valid(), serializer.errors)

        expected = OrderedDict(
            api_id='api1',
            description='First API',
            organization_name='Test Organization',
            organization_oin='00001234567890123456',
            service_name='First Service',
            api_type='rest_json',
            api_authentication='api_key',
            environments=[
                OrderedDict({
                    'name': 'production',
                    'api_url': 'http://production.nl',
                }),
            ],
            forum_vendor='discourse',
            forum_url='http://mydiscourse.com',
            contact_email='contact@api1.com',
            contact_phone='0612345678',
            contact_url='mywebsite.com',
            is_reference_implementation=False,
            terms_government_only=False,
            terms_pay_per_use=True,
            terms_uptime_guarantee=Decimal('1.000000'),
            terms_support_response_time=2,
        )

        self.assertDictEqual(serializer.data, expected)

    def test_deserialize_minimal_input(self):
        input_data = {
            'id': 'api1',
            'description': 'First API',
            'organization_name': 'Test Organization',
            'organization_oin': '00001234567890123456',
            'service_name': 'First Service',
            'environments': [
                {
                    'name': 'production',
                    'api_url': 'http://production.nl',
                },
            ],
        }

        serializer = APISerializer(data=input_data)
        self.assertTrue(serializer.is_valid(), serializer.errors)

        expected = OrderedDict(
            api_id='api1',
            description='First API',
            organization_name='Test Organization',
            service_name='First Service',
            environments=[
                OrderedDict({
                    'name': 'production',
                    'api_url': 'http://production.nl',
                }),
            ],
        )

        self.assertDictEqual(serializer.data, expected)

    def test_deserialize_empty_subobjects(self):
        input_data = {
            'id': 'api1',
            'description': 'First API',
            'organization_name': 'Test Organization',
            'organization_oin': '00001234567890123456',
            'service_name': 'First Service',
            'environments': [
                {
                    'name': 'production',
                    'api_url': 'http://production.nl',
                },
            ],
            'contact': {},
            'terms_of_use': {},
        }

        serializer = APISerializer(data=input_data)
        self.assertTrue(serializer.is_valid(), serializer.errors)

        expected = OrderedDict(
            api_id='api1',
            description='First API',
            organization_name='Test Organization',
            service_name='First Service',
            environments=[
                OrderedDict({
                    'name': 'production',
                    'api_url': 'http://production.nl',
                }),
            ],
        )

        self.assertDictEqual(serializer.data, expected)

    def test_deserialize_blank_subobjects(self):
        input_data = {
            'id': 'api1',
            'description': 'First API',
            'organization_name': 'Test Organization',
            'organization_oin': '00001234567890123456',
            'service_name': 'First Service',
            'environments': [
                {
                    'name': 'production',
                    'api_url': 'http://production.nl',
                },
            ],
            'contact': {
                'email': '',
                'phone': '',
                'url': '',
            },
            'terms_of_use': {
                'government_only': None,
                'pay_per_use': None,
                'uptime_guarantee': None,
                'support_response_time': None,
            },
        }

        serializer = APISerializer(data=input_data)
        self.assertTrue(serializer.is_valid(), serializer.errors)

        expected = OrderedDict(
            api_id='api1',
            description='First API',
            organization_name='Test Organization',
            service_name='First Service',
            environments=[
                OrderedDict({
                    'name': 'production',
                    'api_url': 'http://production.nl',
                }),
            ],
            contact_email='',
            contact_phone='',
            contact_url='',
            terms_government_only=None,
            terms_pay_per_use=None,
            terms_uptime_guarantee=None,
            terms_support_response_time=None,
        )

        self.assertDictEqual(serializer.data, expected)

    def test_deserialize_missing_fields(self):
        input_data = {}
        serializer = APISerializer(data=input_data)

        self.assert_serializer_has_errors(serializer, {
            'id': [REQUIRED_ERROR],
            'description': [REQUIRED_ERROR],
            'organization_name': [REQUIRED_ERROR],
            'organization_oin': [REQUIRED_ERROR],
            'service_name': [REQUIRED_ERROR],
            'environments': [REQUIRED_ERROR],
        })

    # Because badges are read-only
    def test_deserialize_ignore_badges(self):
        input_data = {
            'id': 'api1',
            'description': 'First API',
            'organization_name': 'Test Organization',
            'organization_oin': '00001234567890123456',
            'service_name': 'First Service',
            'environments': [
                {
                    'name': 'production',
                    'api_url': 'http://production.nl',
                },
            ],
            'badges': [
                OrderedDict({
                    'name': 'Golden Test',
                })
            ],
        }

        serializer = APISerializer(data=input_data)
        self.assertTrue(serializer.is_valid(), serializer.errors)

        expected = OrderedDict(
            api_id='api1',
            description='First API',
            organization_name='Test Organization',
            service_name='First Service',
            environments=[
                OrderedDict({
                    'name': 'production',
                    'api_url': 'http://production.nl',
                }),
            ],
        )

        self.assertDictEqual(serializer.data, expected)

    def test_deserialize_forum_invalid_vendor(self):
        input_data = {
            'id': 'api1',
            'description': 'First API',
            'organization_name': 'Test Organization',
            'organization_oin': '00001234567890123456',
            'service_name': 'First Service',
            'environments': [
                {
                    'name': 'production',
                    'api_url': 'http://production.nl',
                },
            ],
            'forum': {
                'vendor': 'SomethingUnknown',
                'url': 'http://mydiscourse.com',
            },
        }
        serializer = APISerializer(data=input_data)

        self.assert_serializer_has_errors(serializer, {
            'forum': {'vendor': [INVALID_ERROR]},
        })

    def test_deserialize_forum_missing_fields(self):
        input_data = {
            'id': 'api1',
            'description': 'First API',
            'organization_name': 'Test Organization',
            'organization_oin': '00001234567890123456',
            'service_name': 'First Service',
            'environments': [
                {
                    'name': 'production',
                    'api_url': 'http://production.nl',
                },
            ],
            'forum': {},
        }
        serializer = APISerializer(data=input_data)

        self.assert_serializer_has_errors(serializer, {
            'forum': {
                'vendor': [REQUIRED_ERROR],
                'url': [REQUIRED_ERROR],
            },
        })

    def test_deserialize_forum_blank_url(self):
        input_data = {
            'id': 'api1',
            'description': 'First API',
            'organization_name': 'Test Organization',
            'organization_oin': '00001234567890123456',
            'service_name': 'First Service',
            'environments': [
                {
                    'name': 'production',
                    'api_url': 'http://production.nl',
                },
            ],
            'forum': {
                'vendor': 'discourse',
                'url': '',
            },
        }
        serializer = APISerializer(data=input_data)

        self.assert_serializer_has_errors(serializer, {
            'forum': {'url': [BLANK_ERROR]},
        })

    def test_deserialize_environments_invalid_name(self):
        input_data = {
            'id': 'api1',
            'description': 'First API',
            'organization_name': 'Test Organization',
            'organization_oin': '00001234567890123456',
            'service_name': 'First Service',
            'environments': [
                {
                    'name': 'INVALID NAME',
                    'api_url': 'http://production.nl',
                },
            ],
        }
        serializer = APISerializer(data=input_data)

        self.assert_serializer_has_errors(serializer, {
            'environments': [{'name': [INVALID_CHOICE_ERROR]}],
        })

    def test_deserialize_environments_missing_fields(self):
        input_data = {
            'id': 'api1',
            'description': 'First API',
            'organization_name': 'Test Organization',
            'organization_oin': '00001234567890123456',
            'service_name': 'First Service',
            'environments': [{}],
        }
        serializer = APISerializer(data=input_data)

        self.assert_serializer_has_errors(serializer, {
            'environments': [{
                'name': [REQUIRED_ERROR],
                'api_url': [REQUIRED_ERROR],
            }],
        })

    def test_deserialize_environments_no_environments(self):
        input_data = {
            'id': 'api1',
            'description': 'First API',
            'organization_name': 'Test Organization',
            'organization_oin': '00001234567890123456',
            'service_name': 'First Service',
            'environments': [],
        }
        serializer = APISerializer(data=input_data)

        self.assert_serializer_has_errors(serializer, {
            'environments': [INVALID_ERROR],
        })

    def test_deserialize_environments_duplicate_name(self):
        input_data = {
            'id': 'api1',
            'description': 'First API',
            'organization_name': 'Test Organization',
            'organization_oin': '00001234567890123456',
            'service_name': 'First Service',
            'environments': [
                {
                    'name': 'production',
                    'api_url': 'http://production.nl/1',
                },
                {
                    'name': 'production',
                    'api_url': 'http://production.nl/2',
                },
            ],
        }
        serializer = APISerializer(data=input_data)

        self.assert_serializer_has_errors(serializer, {
            'environments': [INVALID_ERROR],
        })

    def test_deserialize_support_response_time_negative(self):
        input_data = {
            'id': 'api1',
            'description': 'First API',
            'organization_name': 'Test Organization',
            'organization_oin': '00001234567890123456',
            'service_name': 'First Service',
            'environments': [
                {
                    'name': 'production',
                    'api_url': 'http://production.nl',
                },
            ],
            'terms_of_use': {
                'support_response_time': -1,
            },
        }
        serializer = APISerializer(data=input_data)

        self.assert_serializer_has_errors(serializer, {
            'terms_of_use': {
                'support_response_time': [MIN_VALUE_ERROR],
            },
        })
