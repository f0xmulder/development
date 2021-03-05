import json
import markdown

import requests

from django.core.exceptions import ImproperlyConfigured
from django.http import HttpResponse, QueryDict
from django.utils.html import SafeString
from django.views.generic import TemplateView


class ProxyView(TemplateView):
    """ Generic view to proxy a request. Only supports GET for now """

    remote_url = None
    format_param_name = "format"
    format = None
    template_name = 'core/proxy.html'
    docs = ""

    def get_remote_url(self):
        if self.remote_url is None:
            raise ImproperlyConfigured(
                "ProxyView requires either a definition of "
                "'remote_url' or an implementation of 'get_remote_url()'")
        return self.remote_url

    def get_query_params(self):
        params = self.request.GET.copy()
        format_vals = params.pop(self.format_param_name, None)
        if format_vals and format_vals[0] in ['json', 'html']:
            self.format = format_vals[0]
        return params

    def get_format(self):
        if self.format:
            return self.format
        accept_val = self.request.headers.get('Accept')
        if accept_val:
            for accept_type in accept_val.split(","):
                if accept_type.startswith("text/html"):
                    return 'html'
                if accept_type.startswith("application/json"):
                    return 'json'
        return 'json'

    def get_request_headers(self):
        return {}

    def transform_content(self, content, pretty=False):  # noqa
        return content

    def get_content_type(self):
        return self.remote_response.headers.get('content-type')

    def get(self, *args, **kwargs):  # noqa
        # prepare request and send to remote url
        self.remote_url = self.get_remote_url()
        headers = self.get_request_headers()
        query_params = self.get_query_params()
        if query_params:
            rq = QueryDict(mutable=True)
            rq.update(query_params)
            self.remote_query_string = rq.urlencode()
        else:
            self.remote_query_string = ""
        remote_resp = requests.get(self.remote_url, params=query_params, headers=headers)

        # handle remote response and wrap in returned response
        self.remote_response = remote_resp
        fmt = self.get_format()
        self.content = self.transform_content(remote_resp.content, pretty=(fmt == 'html'))

        if fmt == 'html':
            self.content_type = 'text/html'
            return super().get(*args, **kwargs)

        self.content_type = self.get_content_type()
        return HttpResponse(
            content=self.content, content_type=self.content_type, status=remote_resp.status_code)


class CorApiView(ProxyView):
    """ View to proxy the COR API. Because of CORS this can not be queried by the front end """

    remote_url = "https://portaal.digikoppeling.nl/registers/api/v1/organisaties"
    notransform = False

    docs = SafeString(markdown.markdown("""# Proxy for the COR organizations API

For details see: <https://portaal.digikoppeling.nl/registers/corApi/index>

It acts as a proxy and transformer of the original data.

All query string parameters are passed on to the remote API except for the following:

* q=[search_text] is an alias for the remote parameter "zoek"
* page=[page_number] is an alias for the remote parameter "pagina"
* format=json forces the output to be in JSON format even when the Accept header has preference for
  HTML (when you look at it in a browser)
* notransform=true prevents transforming of the original content"""))

    def get_query_params(self):
        params = super().get_query_params()
        page = params.pop("page", None)
        if page:
            params["pagina"] = page
        search = params.pop("q", None)
        if search:
            params["zoek"] = search
        notransform = params.pop("notransform", None)
        if notransform and notransform[0].lower() == "true":
            self.notransform = True
        return params

    def get_request_headers(self):
        headers = super().get_request_headers()
        headers["Accept"] = "application/hal+json"
        headers["Accept-Version"] = "1.1"

    def header_as_int(self, header_name, default):
        value = self.remote_response.headers.get(header_name)
        if value is None:
            return default
        try:
            return int(value)
        except ValueError:
            return default

    def get_content_type(self):
        content_type = super().get_content_type()
        if (self.remote_response.status_code // 100 == 2 and
                content_type.startswith('application/hal+json') and not self.notransform):
            return 'application/json'
        return content_type

    def transform_content(self, content, pretty=False):
        if self.remote_response.status_code // 100 == 2:
            # succesful status code, transform document
            content = json.loads(content)
            if not self.notransform:
                orgs = content.pop("organisaties", [])
                for org in orgs:
                    del org["_links"]

                content = {
                    "page": self.header_as_int("X-Pagination-Page", 1),
                    "rowsPerPage": self.header_as_int("X-Pagination-Limit", 30),
                    "totalResults": self.header_as_int("X-Total-Count", len(orgs)),
                    "results": orgs,
                }
            if pretty:
                dump_kwargs = {"indent": 2}
            else:
                dump_kwargs = {}
            content = json.dumps(content, **dump_kwargs)

        return content
