from unittest.mock import patch

from django.test import TestCase
from requests import RequestException, Timeout
from rest_framework import status

from core.tests.mocking import mock_response
from core.views import proxy_url, APIProxyException


class ProxyUrlTest(TestCase):
    def setUp(self):
        # Display whole JSON diffs
        self.maxDiff = None

    @patch('requests.get')
    def test_http_error(self, mock_get):
        mock_get.return_value = mock_response(500, data='oops')

        with self.assertRaises(APIProxyException) as r:
            proxy_url('https://geoforum.nl/c/datasets/bag.json', 'forum integration')
        self.assertEqual(r.exception.status_code, status.HTTP_502_BAD_GATEWAY)
        self.assertEqual(r.exception.detail, 'Failed to retrieve forum integration URL at '
                                             'https://geoforum.nl/c/datasets/bag.json (response '
                                             'code is not 200 OK): 500: oops')

    @patch('requests.get')
    def test_unexpected_status_code(self, mock_get):
        mock_get.return_value = mock_response(201, data='Created!')

        with self.assertRaises(APIProxyException) as r:
            proxy_url('https://geoforum.nl/c/datasets/bag.json', 'forum integration')
        self.assertEqual(r.exception.status_code, status.HTTP_502_BAD_GATEWAY)
        self.assertEqual(r.exception.detail, 'Failed to retrieve forum integration URL at '
                                             'https://geoforum.nl/c/datasets/bag.json (response '
                                             'code is not 200 OK): 201: Created!')

    @patch('requests.get')
    def test_timeout(self, mock_get):
        mock_get.side_effect = Timeout("Timeout!")

        with self.assertRaises(APIProxyException) as r:
            proxy_url('https://geoforum.nl/c/datasets/bag.json', 'forum integration')
        self.assertEqual(r.exception.status_code, status.HTTP_504_GATEWAY_TIMEOUT)
        self.assertEqual(r.exception.detail, 'Failed to retrieve forum integration URL at '
                                             'https://geoforum.nl/c/datasets/bag.json due to '
                                             'timeout')

    def test_invalid_url(self):
        with self.assertRaises(ValueError):
            proxy_url('httpssss://geoforum.nl/c/datasets/bag', 'forum integration')

    @patch('requests.get')
    def test_request_exception(self, mock_get):
        mock_get.side_effect = RequestException("Help! An Error!")

        with self.assertRaises(APIProxyException) as r:
            proxy_url('https://geoforum.nl/c/datasets/bag.json', 'forum integration')
        self.assertEqual(r.exception.status_code, status.HTTP_502_BAD_GATEWAY)
