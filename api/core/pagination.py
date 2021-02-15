from collections import OrderedDict

from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response


class StandardResultsSetPagination(PageNumberPagination):
    page_size = 10
    page_size_query_param = 'rowsPerPage'

    def get_paginated_response(self, data):
        return Response(OrderedDict([
            ('page', self.page.number),
            ('rowsPerPage', self.get_page_size(self.request)),
            ('totalResults', self.page.paginator.count),
            ('results', data)
        ]))

    def get_paginated_response_schema(self, schema):
        return {
            'type': 'object',
            'properties': {
                'page': {
                    'type': 'integer',
                    'example': 123,
                },
                'rowsPerPage': {
                    'type': 'integer',
                    'example': 123,
                },
                'totalResults': {
                    'type': 'integer',
                    'example': 123,
                },
                'results': schema,
            },
        }
