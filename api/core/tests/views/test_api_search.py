import json
from collections import OrderedDict
import operator
from unittest.mock import patch, MagicMock

from django.test import TransactionTestCase
from rest_framework.exceptions import NotFound
from rest_framework.response import Response

from core.models import API, Organization
from core.serializers import APISerializer
from core.tests.utils import prevent_logging

API_PATH = '/api/apis'


class APISearchTest(TransactionTestCase):

    def setUp(self):
        self.orgs_vals = {
            "Het bureau": "00000000000000000001",
            "De staat": "00000000000000000002",
        }
        self.orgs = [Organization.objects.create(name=k, oin=v) for k, v in self.orgs_vals.items()]
        self.api1 = API.objects.create(
            api_id='kad1',
            service_name='Eerste Kadaster',
            description='Originele Kadaster API',
            organization=self.orgs[0],
            api_type='rest_json',
            api_authentication='none',
            is_reference_implementation=False,
            contact_email='contact@api1.com',
        )
        self.api2 = API.objects.create(
            api_id='kad2',
            service_name='Tweede Kadaster',
            description='Nieuwe Kadaster API',
            organization=self.orgs[1],
            api_type='graphql',
            api_authentication='unknown',
            is_reference_implementation=True,
            contact_email='contact@api2.com',
        )
        self.api3 = API.objects.create(
            api_id='vuil',
            service_name='De eerste echte vuilnisbakken API',
            description='Alle bakken die aan de openbare weg staan',
            organization=self.orgs[1],
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

        try:
            response_data = json.loads(response.content)
        except json.JSONDecodeError:
            self.fail(f'response.content is not valid JSON: {response.content}')

        expected_results = list(APISerializer(expected_apis, many=True).data)
        expected_results.sort(key=operator.itemgetter("id"))
        # Convert results from OrderedDict to dict
        expected_results = [dict(r) for r in expected_results]
        response_data['results'].sort(key=operator.itemgetter("id"))
        self.assertEqual(response_data['results'], expected_results)

        api_terms = [
            {'term': t, 'count': expected_api_type_facets[t]} for t in expected_api_type_facets]
        api_terms.sort(key=operator.itemgetter("term"))
        org_terms = [{
            'term': self.orgs_vals[t],
            'display_name': t,
            'count': excepted_organization_facets[t],
        } for t in excepted_organization_facets]
        org_terms.sort(key=operator.itemgetter("term"))
        expected_facets = {
            'api_type': {
                'terms': api_terms,
            },
            'organization_oin': {
                'terms': org_terms,
            },
        }
        response_data['facets']['api_type']['terms'].sort(key=operator.itemgetter("term"))
        response_data['facets']['organization_oin']['terms'].sort(key=operator.itemgetter("term"))
        self.assertEqual(response_data['facets'], expected_facets)

        return response_data

    @patch('core.views.APIViewSet.pagination_class')
    def test_pagination(self, mock_pagination_class):
        mock_results = [self.api1, self.api2, self.api3]
        serialized_mock_results = APISerializer(mock_results, many=True).data
        mock_response_dict = OrderedDict([
            ('page', 10),
            ('rowsPerPage', 2),
            ('totalResults', 30),
            ('results', serialized_mock_results)
        ])

        instance = mock_pagination_class.return_value
        instance.paginate_queryset = MagicMock(return_value=mock_results)
        instance.get_paginated_response = MagicMock(return_value=Response(mock_response_dict))

        response_data = self.run_search_test(
            '',
            [self.api1, self.api2, self.api3],
            {
                'graphql': 1,
                'rest_json': 2,
            },
            {
                'De staat': 2,
                'Het bureau': 1,
            }
        )

        instance.paginate_queryset.assert_called()
        instance.get_paginated_response.assert_called_with(serialized_mock_results)

        for k, v in mock_response_dict.items():
            if k == 'results':
                continue

            self.assertEqual(
                response_data[k],
                v,
                f'response_data.{k} does not equal mock_response_dict.{k}'
            )

    @prevent_logging
    @patch('core.views.APIViewSet.pagination_class')
    def test_pagination_invalid_page(self, mock_pagination_class):
        def raise_not_found(*args, **kwargs):
            raise NotFound('test msg')

        def raise_attribute_error(*args, **kwargs):
            raise AttributeError('self.page not set because paginate_queryset failed')

        instance = mock_pagination_class.return_value
        instance.paginate_queryset = MagicMock(side_effect=raise_not_found)
        instance.get_paginated_response = MagicMock(side_effect=raise_attribute_error)

        response = self.client.get(API_PATH + '?page=99')
        self.assertEqual(response.status_code, 404)

    def test_no_params(self):
        self.run_search_test(
            '',
            [self.api1, self.api2, self.api3],
            {
                'graphql': 1,
                'rest_json': 2,
            },
            {
                'De staat': 2,
                'Het bureau': 1,
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

    def test_search_name_punctuation(self):
        self.run_search_test(
            'q=!@#$%^&*()~`:;:\'"<,>.?/|\\{[]}_-+=',
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

    def test_search_name_partial(self):
        self.run_search_test(
            'q=Twe',
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

    def test_search_name_two_partial_terms_in_wrong_order(self):
        self.run_search_test(
            'q=AP+vuil',
            [self.api3],
            {
                'graphql': 0,
                'rest_json': 1,
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

    def test_search_description_partial(self):
        self.run_search_test(
            'q=Origi',
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

    def test_search_description_two_partial_terms_in_wrong_order(self):
        self.run_search_test(
            'q=sta+bak',
            [self.api3],
            {
                'graphql': 0,
                'rest_json': 1,
            },
            {
                'De staat': 1,
                'Het bureau': 0,
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
            'organization_oin=00000000000000000001',
            [self.api1],
            {
                'graphql': 0,
                'rest_json': 1,
            },
            {
                'De staat': 2,
                'Het bureau': 1,
            })

    def test_organization_multiple(self):
        self.run_search_test(
            'organization_oin=00000000000000000001&organization_oin=00000000000000000002',
            [self.api1, self.api2, self.api3],
            {
                'graphql': 1,
                'rest_json': 2,
            },
            {
                'De staat': 2,
                'Het bureau': 1,
            }
        )

    def test_organization_no_results(self):
        self.run_search_test(
            'organization_oin=00000000000000099999',
            [],
            {
                'graphql': 0,
                'rest_json': 0,
            },
            {
                'De staat': 2,
                'Het bureau': 1,
            }
        )

    def test_organization_no_partial_match(self):
        self.run_search_test(
            'organization_oin=0000',
            [],
            {
                'graphql': 0,
                'rest_json': 0,
            },
            {
                'De staat': 2,
                'Het bureau': 1,
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
                'De staat': 1,
                'Het bureau': 1,
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
                'De staat': 2,
                'Het bureau': 1,
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
                'De staat': 0,
                'Het bureau': 0,
            }
        )

    def test_combo_facet_search(self):
        self.run_search_test(
            'q=Eerste&organization_oin=00000000000000000002',
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
            'organization_oin=00000000000000000002&api_type=rest_json',
            [self.api3],
            {
                'graphql': 1,
                'rest_json': 1,
            },
            {
                'De staat': 1,
                'Het bureau': 1,
            }
        )

    def test_combo_no_results(self):
        self.run_search_test(
            'q=Tweede&organization_oin=00000000000000000001',
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
