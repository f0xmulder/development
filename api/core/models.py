from django.db import models

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
