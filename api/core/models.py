from django.db import models
from django.utils.html import format_html

MAX_URL_LENGTH = 2000
MAX_TEXT_LENGTH = 255
MAX_ENUM_LENGTH = 31


class API(models.Model):
    class APIType(models.TextChoices):
        UNKNOWN = 'unknown'
        REST_JSON = 'rest_json'
        REST_XML = 'rest_xml'
        SOAP_XML = 'soap_xml'
        GRPC = 'grpc'
        GRAPHQL = 'graphql'
        SPARQL = 'sparql'
        WFS = 'wfs'
        WMS = 'wms'

    class APIAuthentication(models.TextChoices):
        UNKNOWN = 'unknown'
        NONE = 'none'
        MUTUAL_TLS = 'mutual_tls'
        API_KEY = 'api_key'
        IP_WHITELIST = 'ip_whitelist'

    api_id = models.CharField(max_length=MAX_TEXT_LENGTH, unique=True)
    description = models.TextField()
    organization_name = models.CharField(max_length=MAX_TEXT_LENGTH)
    service_name = models.CharField(max_length=MAX_TEXT_LENGTH)
    api_type = models.CharField(
        max_length=MAX_ENUM_LENGTH,
        choices=APIType.choices,
        default=APIType.UNKNOWN
    )
    api_authentication = models.CharField(
        max_length=MAX_ENUM_LENGTH,
        choices=APIAuthentication.choices,
        default=APIAuthentication.UNKNOWN
    )
    is_reference_implementation = models.BooleanField(default=False)

    contact_email = models.CharField(max_length=MAX_TEXT_LENGTH, blank=True)
    contact_phone = models.CharField(max_length=MAX_TEXT_LENGTH, blank=True)
    contact_url = models.URLField(max_length=MAX_URL_LENGTH, blank=True)

    terms_government_only = models.BooleanField(null=True)
    terms_pay_per_use = models.BooleanField(null=True)
    terms_uptime_guarantee = models.DecimalField(
        null=True,
        decimal_places=6,
        max_digits=8,
    )
    terms_support_response_time = models.PositiveIntegerField(
        help_text='Measured in number of workdays',
        null=True,
    )

    forum_vendor = models.CharField(max_length=MAX_ENUM_LENGTH, blank=True)
    forum_url = models.URLField(max_length=MAX_URL_LENGTH, blank=True)

    badges = models.ManyToManyField(
        'Badge',
        through='APIBadge',
        related_name='apis',
    )
    referenced_apis = models.ManyToManyField(
        'self',
        through='Relation',
        symmetrical=False,
        related_name='referenced_by_apis',
    )

    def __str__(self):
        return self.api_id


class Environment(models.Model):
    class EnvironmentType(models.TextChoices):
        PRODUCTION = 'production'
        ACCEPTANCE = 'acceptance'
        DEMO = 'demo'

    name = models.CharField(max_length=MAX_ENUM_LENGTH, choices=EnvironmentType.choices)
    api_url = models.URLField(max_length=MAX_URL_LENGTH)
    specification_url = models.URLField(max_length=MAX_URL_LENGTH, blank=True)
    documentation_url = models.URLField(max_length=MAX_URL_LENGTH, blank=True)

    api = models.ForeignKey(
        API,
        to_field='api_id',
        on_delete=models.CASCADE,
        related_name='environments',
    )

    def __str__(self):
        return self.name


class Relation(models.Model):
    TYPE_REFERENCE_IMPLEMENTATION = "reference-implementation"

    name = models.CharField(max_length=MAX_TEXT_LENGTH, blank=True)
    from_api = models.ForeignKey(
        API,
        to_field='api_id',
        on_delete=models.CASCADE,
        related_name='relations_from',
    )
    to_api = models.ForeignKey(
        API,
        to_field='api_id',
        db_constraint=False,
        on_delete=models.DO_NOTHING,
        related_name='relations_to',
    )

    def __str__(self):
        return f'{self.from_api_id} {self.name} {self.to_api_id}'


class Badge(models.Model):
    name = models.CharField(max_length=MAX_TEXT_LENGTH)

    def __str__(self):
        return self.name


class APIBadge(models.Model):
    api = models.ForeignKey(
        API,
        to_field='api_id',
        db_constraint=False,
        on_delete=models.DO_NOTHING,
    )
    badge = models.ForeignKey(Badge, on_delete=models.CASCADE)

    def __str__(self):
        return f'{self.api_id} <-> {self.badge}'


class Event(models.Model):
    title = models.TextField(max_length=MAX_TEXT_LENGTH)
    start_date = models.DateTimeField(db_index=True)
    location = models.TextField(max_length=MAX_TEXT_LENGTH)
    registration_url = models.URLField(max_length=MAX_URL_LENGTH)

    is_published = models.BooleanField(default=False)

    def __str__(self):
        return self.title

    class Meta:
        ordering = ['start_date']


class URL(models.Model):
    _last_probe = None

    url = models.CharField(max_length=MAX_URL_LENGTH, unique=True)
    # Todo: I expect that the number of uptime probes will become large, so we may want to cache
    #  some statistics about each url so we don't have to scan all uptime probes for a page load.
    #  However that can only be implemented once we know how we want to use the uptimes.

    def last_probe(self):
        if self._last_probe is None:
            self._last_probe = self.urlprobe_set.order_by('-timestamp').first()
        return self._last_probe

    def last_ok(self):
        last_probe = self.last_probe()

        if last_probe is None:
            return None
        return last_probe.ok()
    last_ok.boolean = True

    def last_error(self):
        last_probe = self.last_probe()

        if last_probe is None:
            return None
        return last_probe.errmsg()

    def used_in_api(self):
        return format_html(';<br>\n'.join(
            format_html('{} url for {}', link.field, link.api.api_id)
            for link in self.api_links.all()
        ))
    used_in_api.admin_order_field = 'api_links__api__api_id'

    def __str__(self):
        return self.url


class URLProbe(models.Model):
    # Factor the url to a separate table to save space
    url = models.ForeignKey(URL, on_delete=models.PROTECT)
    timestamp = models.DateTimeField(auto_now_add=True)
    status_code = models.SmallIntegerField(null=True, blank=True)
    error = models.TextField(blank=True)

    def ok(self):
        return self.status_code == 200
    ok.boolean = True

    def errmsg(self):
        if self.ok():
            return None
        if self.status_code is not None:
            return f'Error: HTTP status {self.status_code}'
        return self.error

    def used_in_api(self):
        return format_html(';<br>\n'.join(
            format_html('{} url for {}', link.field, link.api.api_id)
            for link in self.url.api_links.all()
        ))
    used_in_api.admin_order_field = 'url__api_links__api__api_id'

    def __str__(self):
        status = 'ok' if self.ok() else self.errmsg()
        return f'{self.url.url}: {status}'

    class Meta:
        indexes = [models.Index(fields=['url', '-timestamp'])]


class URLApiLink(models.Model):
    class FieldReference(models.TextChoices):
        FORUM = 'forum'
        CONTACT = 'contact'
        PRODUCTION_API = 'production_api'
        PRODUCTION_SPEC = 'production_spec'
        PRODUCTION_DOC = 'production_doc'
        ACCEPTANCE_API = 'acceptance_api'
        ACCEPTANCE_SPEC = 'acceptance_spec'
        ACCEPTANCE_DOC = 'acceptance_doc'
        DEMO_API = 'demo_api'
        DEMO_SPEC = 'demo_spec'
        DEMO_DOC = 'demo_doc'

    url = models.ForeignKey(URL, on_delete=models.CASCADE, related_name='api_links')
    api = models.ForeignKey(API, on_delete=models.CASCADE, related_name='url_links')
    field = models.CharField(max_length=MAX_ENUM_LENGTH, choices=FieldReference.choices)

    def __str__(self):
        return f'{self.field} url for {self.api}'


class Config(models.Model):
    variable = models.CharField(max_length=MAX_TEXT_LENGTH, unique=True)
    enabled = models.BooleanField()

    def __str__(self):
        return f'{self.variable}: {"enabled" if self.enabled else "disabled"}'
