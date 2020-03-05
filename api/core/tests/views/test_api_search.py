import json

from django.test import TestCase

from core.models import API
from core.serializers import APISerializer

API_PATH = '/api/apis/search'


class APISearchTest(TestCase):
    def setUp(self):
        self.api1 = API.objects.create(
            api_id='kad1',
            service_name='Eerste Kadaster',
            description='Originele Kadaster API',
            organization_name='Het bureau',
            api_type='rest_json',
            api_authentication='none',
            is_reference_implementation=False,
            contact_email='contact@api1.com',
        )
        self.api2 = API.objects.create(
            api_id='kad2',
            service_name='Tweede Kadaster',
            description='Nieuwe Kadaster API',
            organization_name='De staat',
            api_type='graphql',
            api_authentication='unknown',
            is_reference_implementation=True,
            contact_email='contact@api2.com',
        )
        self.api3 = API.objects.create(
            api_id='vuil',
            service_name='De eerste echte vuilnisbakken API',
            description='Alle bakken die aan de openbare weg staan',
            organization_name='De staat',
            api_type='rest_json',
            api_authentication='none',
            is_reference_implementation=False,
            contact_email='contact@amsterdam.com',
        )

        # Display whole JSON diffs
        self.maxDiff = None

    def run_search_test(self,
                        query_string,
                        expected_apis,
                        expected_api_type_facets,
                        excepted_organization_facets):
        response = self.client.get(API_PATH + '?' + query_string)

        self.assertEqual(response.status_code, 200)

        api_jsons = [json.dumps(APISerializer(api).data) for api in expected_apis]
        facets_dict = {
            'api_type': {
                'terms': [{'term': t, 'count': expected_api_type_facets[t]}
                          for t in expected_api_type_facets]
            },
            'organization_name': {
                'terms': [{'term': t, 'count': excepted_organization_facets[t]}
                          for t in excepted_organization_facets]
            },
        }
        expected = """{
            "apis": [
                """ + ', '.join(api_jsons) + """
            ],
            "facets": """ + json.dumps(facets_dict) + """
        }"""

        self.assertJSONEqual(response.content, expected)

    def test_no_params(self):
        self.run_search_test(
            '',
            [self.api1, self.api2, self.api3],
            {
                'graphql': 1,
                'rest_json': 2,
            },
            {
                'Het bureau': 1,
                'De staat': 2,
            }
        )

    def test_no_results(self):
        self.run_search_test(
            'q=VVVVVVVVV',
            [],
            {
                'graphql': 0,
                'rest_json': 0,
            },
            {
                'De staat': 0,
                'Het bureau': 0,
            }
        )

    def test_search_name(self):
        self.run_search_test(
            'q=Tweede',
            [self.api2],
            {
                'graphql': 1,
                'rest_json': 0,
            },
            {
                'De staat': 1,
                'Het bureau': 0,
            }
        )

    def test_search_description(self):
        self.run_search_test(
            'q=Originele',
            [self.api1],
            {
                'graphql': 0,
                'rest_json': 1,
            },
            {
                'De staat': 0,
                'Het bureau': 1,
            }
        )

    def test_search_org_name(self):
        self.run_search_test(
            'q=Bureau',
            [self.api1],
            {
                'graphql': 0,
                'rest_json': 1,
            },
            {
                'De staat': 0,
                'Het bureau': 1,
            }
        )

    def test_search_api_type(self):
        self.run_search_test(
            'q=GraphQL',
            [self.api2],
            {
                'graphql': 1,
                'rest_json': 0,
            },
            {
                'De staat': 1,
                'Het bureau': 0,
            }
        )

    def test_organization(self):
        self.run_search_test(
            'organization_name=Het+bureau',
            [self.api1],
            {
                'graphql': 0,
                'rest_json': 1,
            },
            {
                'Het bureau': 1,
                'De staat': 2,
            })

    def test_organization_multiple(self):
        self.run_search_test(
            'organization_name=Het+bureau&organization_name=De+staat',
            [self.api1, self.api2, self.api3],
            {
                'graphql': 1,
                'rest_json': 2,
            },
            {
                'Het bureau': 1,
                'De staat': 2,
            }
        )

    def test_organization_no_results(self):
        self.run_search_test(
            'organization_name=VNG+Realisatie',
            [],
            {
                'graphql': 0,
                'rest_json': 0,
            },
            {
                'Het bureau': 1,
                'De staat': 2,
            }
        )

    def test_organization_no_partial_match(self):
        self.run_search_test(
            'organization_name=bureau',
            [],
            {
                'graphql': 0,
                'rest_json': 0,
            },
            {
                'Het bureau': 1,
                'De staat': 2,
            }
        )

    def test_api_type(self):
        self.run_search_test(
            'api_type=rest_json',
            [self.api1, self.api3],
            {
                'graphql': 1,
                'rest_json': 2,
            },
            {
                'Het bureau': 1,
                'De staat': 1,
            }
        )

    def test_api_type_multiple(self):
        self.run_search_test(
            'api_type=rest_json&api_type=graphql',
            [self.api1, self.api2, self.api3],
            {
                'graphql': 1,
                'rest_json': 2,
            },
            {
                'Het bureau': 1,
                'De staat': 2,
            }
        )

    def test_api_type_no_results(self):
        self.run_search_test(
            'api_type=bunch_of_excel_files',
            [],
            {
                'graphql': 1,
                'rest_json': 2,
            },
            {
                'Het bureau': 0,
                'De staat': 0,
            }
        )

    def test_combo_facet_search(self):
        self.run_search_test(
            'q=Eerste&organization_name=De+staat',
            [self.api3],
            {
                'graphql': 0,
                'rest_json': 1,
            },
            {
                'De staat': 1,
                'Het bureau': 1,
            }
        )

    def test_combo_different_facets(self):
        self.run_search_test(
            'organization_name=De+staat&api_type=rest_json',
            [self.api3],
            {
                'graphql': 1,
                'rest_json': 1,
            },
            {
                'Het bureau': 1,
                'De staat': 1,
            }
        )

    def test_combo_no_results(self):
        self.run_search_test(
            'q=Tweede&organization_name=Het+bureau',
            [],
            {
                'graphql': 0,
                'rest_json': 0,
            },
            {
                'De staat': 1,
                'Het bureau': 0,
            }
        )
