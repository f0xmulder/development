from collections import OrderedDict

from django.test import TestCase

from core.models import API, Badge, Environment
from core.serializers import APISerializer


DEFAULT_SCORES = {
    'has_contact_details': False,
    'has_documentation': False,
    'has_specification': False,
    'provides_sla': False,
}


class APISerializerTest(TestCase):
    def setUp(self):
        # Display whole diffs
        self.maxDiff = None

    def test_serialize_own_fields(self):
        api = API.objects.create(
            api_id='api1',
            description='First API',
            organization_name='Test Organization',
            service_name='First Service',
            api_type='rest_json',
            api_authentication='api_key',
            is_reference_implementation=False,
            contact_email='contact@api1.com',
            contact_phone='0612345678',
            contact_fax='123124142131',
            contact_chat='mychat.com',
            contact_url='mywebsite.com',
            terms_government_only=False,
            terms_pay_per_use=True,
            terms_uptime_guarantee=1.0,
            terms_support_response_time='2d',
            forum_vendor='discourse',
            forum_url='mydiscourse.com',
        )

        actual = APISerializer(api).data
        expected = {
            'id': 'api1',
            'description': 'First API',
            'organization_name': 'Test Organization',
            'service_name': 'First Service',
            'api_type': 'rest_json',
            'api_authentication': 'api_key',
            'is_reference_implementation': False,
            'badges': [],
            'referenced_apis': [],
            'environments': [],
            'contact': {
                'email': 'contact@api1.com',
                'phone': '0612345678',
                'fax': '123124142131',
                'chat': 'mychat.com',
                'url': 'mywebsite.com',
            },
            'terms_of_use': {
                'government_only': False,
                'pay_per_use': True,
                'uptime_guarantee': 1.0,
                'support_response_time': '2d',
            },
            'forum': {
                'vendor': 'discourse',
                'url': 'mydiscourse.com',
            },
            'scores': {
                'has_contact_details': True,
                'has_documentation': False,
                'has_specification': False,
                'provides_sla': True,
            },
        }

        self.assertDictEqual(actual, expected)

    def test_serialize_empty_api(self):
        api = API.objects.create()

        actual = APISerializer(api).data
        expected = {
            'id': '',
            'description': '',
            'organization_name': '',
            'service_name': '',
            'api_type': 'unknown',
            'api_authentication': 'unknown',
            'is_reference_implementation': False,
            'badges': [],
            'referenced_apis': [],
            'environments': [],
            'contact': {
                'email': '',
                'phone': '',
                'fax': '',
                'chat': '',
                'url': '',
            },
            'terms_of_use': {
                'government_only': None,
                'pay_per_use': None,
                'uptime_guarantee': None,
                'support_response_time': '',
            },
            'scores': {
                'has_contact_details': False,
                'has_documentation': False,
                'has_specification': False,
                'provides_sla': False,
            },
        }

        self.assertDictEqual(actual, expected)

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

        actual_environments = APISerializer(api).data['environments']
        expected_environments = [
            OrderedDict([
                ('name', 'demo'),
                ('api_url', 'https://demo.mysite.com/api'),
                ('specification_url', ''),
                ('documentation_url', ''),
            ]),
            OrderedDict([
                ('name', 'production'),
                ('api_url', 'https://mysite.com/api'),
                ('specification_url', 'https://mysite.com/spec'),
                ('documentation_url', 'https://mysite.com/docs'),
            ]),
        ]

        self.assertEqual(len(actual_environments), len(expected_environments))
        # TODO make comparison independent of the order of the list
        self.assertListEqual(actual_environments, expected_environments)

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

    def test_scores_fax(self):
        api = API.objects.create(contact_fax='1234567890')

        actual_scores = APISerializer(api).data['scores']
        expected_scores = dict(DEFAULT_SCORES, has_contact_details=True)

        self.assertDictEqual(actual_scores, expected_scores)

    def test_scores_chat(self):
        api = API.objects.create(contact_chat='mychat.com')

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
            name='Productie',
            documentation_url='https://mysite.com/docs',
            api=api,
        )

        actual_scores = APISerializer(api).data['scores']
        expected_scores = dict(DEFAULT_SCORES, has_documentation=True)

        self.assertDictEqual(actual_scores, expected_scores)

    def test_scores_specification(self):
        api = API.objects.create(api_id='api1')
        Environment.objects.create(
            name='Productie',
            specification_url='https://mysite.com/spec',
            api=api,
        )

        actual_scores = APISerializer(api).data['scores']
        expected_scores = dict(DEFAULT_SCORES, has_specification=True)

        self.assertDictEqual(actual_scores, expected_scores)

    def test_scores_sla(self):
        api = API.objects.create(
            terms_support_response_time='1w',
            terms_uptime_guarantee=0.99,
        )

        actual_scores = APISerializer(api).data['scores']
        expected_scores = dict(DEFAULT_SCORES, provides_sla=True)

        self.assertDictEqual(actual_scores, expected_scores)
