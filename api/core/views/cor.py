import json

import requests

from django.core.exceptions import ImproperlyConfigured
from django.http import HttpResponse
from django.views import View


class ProxyView(View):
    """ Generic view to proxy a request. Only supports GET for now """

    remote_url = None

    def get_remote_url(self):
        if self.remote_url is None:
            raise ImproperlyConfigured(
                "ProxyView requires either a definition of "
                "'remote_url' or an implementation of 'get_remote_url()'")
        return self.remote_url

    def get_query_params(self):
        return self.request.GET.copy()

    def get_request_headers(self):
        return {}

    def transform_content(self, content):
        return content

    def get_content_type(self):
        return self.remote_response.headers.get('content-type')

    def get(self, *args, **kwargs):
        # prepare request and send to remote url
        remote_url = self.get_remote_url()
        headers = self.get_request_headers()
        remote_resp = requests.get(remote_url, params=self.get_query_params(), headers=headers)

        # handle remote response and wrap in returned response
        self.remote_response = remote_resp
        content = self.transform_content(remote_resp.content)
        content_type = self.get_content_type()
        return HttpResponse(
            content=content, content_type=content_type, status=remote_resp.status_code)


class CorApiView(ProxyView):
    """ View to proxy the COR API. Because of CORS this can not be queried by the front end """

    remote_url = "https://portaal.digikoppeling.nl/registers/api/v1/organisaties"

    def get_query_params(self):
        params = super().get_query_params()
        page = params.pop("page")
        if page:
            params["pagina"] = page
        search = params.pop("q")
        if search:
            params["zoek"] = search
        return params

    def get_request_headers(self):
        headers = super().get_request_headers()
        headers["Accept"] = "application/hal+json"
        headers["Accept-Version"] = "1.1"

    def header_as_int(self, header_name):
        value = self.remote_response.headers.get(header_name)
        if value is None:
            return None
        try:
            return int(value)
        except ValueError:
            return None

    def get_content_type(self):
        content_type = super().get_content_type()
        if (self.remote_response.status_code // 100 == 2 and
                content_type.startswith('application/hal+json')):
            return 'application/json'

    def transform_content(self, content):
        if self.remote_response.status_code // 100 == 2:
            # succesful status code, transform document
            content = json.loads(content)
            orgs = content.pop("organisaties", [])
            for org in orgs:
                del org["_links"]

            content = json.dumps({
                "page": self.header_as_int("X-Pagination-Page"),
                "rowsPerPage": self.header_as_int("X-Pagination-Limit"),
                "totalResults": self.header_as_int("X-Total-Count"),
                "results": orgs,
            })
        return content
