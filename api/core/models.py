from django.db import models
from django.utils.translation import gettext_lazy as _


MAX_URL_LENGTH = 2000
MAX_TEXT_LENGTH = 255
MAX_ENUM_LENGTH = 31


class API(models.Model):
    class APIType(models.TextChoices):
        UNKNOWN = 'unknown', _('Onbekend')
        REST_JSON = 'rest_json', _('Rest/JSON')
        REST_XML = 'rest_xml', _('Rest/XML')
        SOAP_XML = 'soap_xml', _('SOAP/XML')
        GRPC = 'grpc', _('gRPC')
        GRAPHQL = 'graphql', _('GraphQL')
        SPARQL = 'sparql', _('SPARQL')
        WFS = 'wfs', _('WFS')
        WMS = 'wms', _('WMS')

    class APIAuthentication(models.TextChoices):
        UNKNOWN = 'unknown', _('Onbekend')
        NONE = 'none', _('Geen')
        MUTUAL_TLS = 'mutual_tls', _('Mutual TLS')
        API_KEY = 'api_key', _('API Key')
        IP_WHITELIST = 'ip_whitelist', _('IP Whitelist')

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
    contact_fax = models.CharField(max_length=MAX_TEXT_LENGTH, blank=True)
    contact_chat = models.CharField(max_length=MAX_TEXT_LENGTH, blank=True)
    contact_url = models.URLField(max_length=MAX_URL_LENGTH, blank=True)

    terms_government_only = models.BooleanField(null=True)
    terms_pay_per_use = models.BooleanField(null=True)
    terms_uptime_guarantee = models.DecimalField(
        null=True,
        decimal_places=6,
        max_digits=8,
    )
    terms_support_response_time = models.CharField(max_length=MAX_TEXT_LENGTH, blank=True)

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
        PRODUCTION = 'production', _('Productie')
        ACCEPTATION = 'acceptation', _('Acceptatie')
        DEMO = 'demo', _('Demo')

    name = models.CharField(max_length=MAX_ENUM_LENGTH, choices=EnvironmentType.choices)
    api_url = models.URLField(max_length=MAX_URL_LENGTH)
    specification_url = models.URLField(max_length=MAX_URL_LENGTH, blank=True)
    documentation_url = models.URLField(max_length=MAX_URL_LENGTH)

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
        return self.from_api_id + ' ' + self.name + ' ' + self.to_api_id


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
        return self.api_id + ' <-> ' + str(self.badge)
