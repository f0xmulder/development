from django.contrib.postgres.fields import ArrayField
from django.db import models
from django.db.models import (
    Subquery, OuterRef, Case, When, BooleanField, Value, CharField, Prefetch)
from django.db.models.functions import Concat
from django.utils.translation import gettext_lazy as _
from django.utils.html import format_html

MAX_URL_LENGTH = 2000
MAX_TEXT_LENGTH = 255
MAX_ENUM_LENGTH = 31

TEST_VERSION_LENGTH = 200
RULE_TYPE_LENGTH = 250
ERROR_CHARFIELD_LENGTH = 500


class OrganizationQuerySet(models.QuerySet):

    def get_by_natural_key(self, oin):
        return self.get(oin=oin)


class Organization(models.Model):
    name = models.CharField(_("name"), max_length=MAX_TEXT_LENGTH)
    oin = models.CharField(
        _("oin"), max_length=20, unique=True, help_text=_("Organization Identification Number"))
    active = models.BooleanField(_("active"), default=True)

    objects = OrganizationQuerySet.as_manager()

    def natural_key(self):
        return (self.oin,)

    class Meta:
        verbose_name = _("organization")


class APIQuerySet(models.QuerySet):
    """ Custom model to provide handy shortcuts """

    def with_last_session(self):
        """ Adds the most recent design rule session efficiently to the queryset """

        # Using postgres specific "DISTINCT ON". In combination with the order_by clause this
        # queries for the most recent session per test suite
        session_qs = DesignRuleSession.objects.prefetch_related("results").order_by(
            "test_suite", "-started_at").distinct("test_suite")

        # Add the most recent session to the original queryset. It will be available as
        # '_last_session' attribute on the related test_suite object
        pf = Prefetch('test_suite__sessions', queryset=session_qs, to_attr='_last_session')
        return self.select_related('test_suite').prefetch_related(pf)


class API(models.Model):

    objects = APIQuerySet.as_manager()

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
    organization = models.ForeignKey(
        Organization, verbose_name=_("organization"), on_delete=models.PROTECT)
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

    def get_production_environment(self):
        return self.environments.filter(name=Environment.EnvironmentType.PRODUCTION).first()

    def last_design_rule_session(self):
        try:
            return self.test_suite.last_design_rule_session()
        except APIDesignRuleTestSuite.DoesNotExist:
            return None

    def is_rest(self):
        return self.api_type in [self.APIType.REST_JSON, self.APIType.REST_XML]

    class Meta:
        verbose_name = _("API")
        verbose_name_plural = _("APIs")


class Code(models.Model):
    class Source(models.TextChoices):
        GITLAB = 'GitLab repository'
        GITHUB = 'GitHub repository'
        GITLAB_SNIPPET = 'GitLab snippet'
        GITHUB_GIST = 'GitHub gist'

    source = models.CharField(
        max_length=MAX_ENUM_LENGTH,
        choices=Source.choices
    )
    owner_name = models.CharField(max_length=MAX_TEXT_LENGTH)
    name = models.CharField(max_length=MAX_TEXT_LENGTH)
    url = models.URLField(max_length=MAX_URL_LENGTH, unique=True)
    description = models.TextField()
    last_change = models.DateTimeField(db_index=True)
    stars = models.IntegerField(null=True)

    programming_languages = models.ManyToManyField(
        'ProgrammingLanguage',
        related_name='code',
    )

    related_apis = models.ManyToManyField(
        'API',
        through='CodeAPI',
        related_name='related_code',
    )

    def programming_languages_string(self):
        return ', '.join(sorted(p.name for p in self.programming_languages.all()))
    programming_languages_string.short_description = 'programming languages'

    def related_apis_string(self):
        return ', '.join(sorted(a.api_id for a in self.related_apis.all()))
    related_apis_string.short_description = 'related apis'

    def __str__(self):
        return f'{self.owner_name}/{self.name}'


class ProgrammingLanguage(models.Model):
    name = models.CharField(max_length=MAX_TEXT_LENGTH, unique=True)

    def __str__(self):
        return self.name


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
        return f"{self.name} - {self.api_url}"


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
        on_delete=models.PROTECT,
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
        on_delete=models.PROTECT,
    )
    badge = models.ForeignKey(Badge, on_delete=models.CASCADE)

    def __str__(self):
        return f'{self.api_id} <-> {self.badge}'


class CodeAPI(models.Model):
    code = models.ForeignKey(Code, on_delete=models.CASCADE)
    api = models.ForeignKey(
        API,
        to_field='api_id',
        on_delete=models.CASCADE,
    )

    def __str__(self):
        return f'{self.api.api_id} <-> {self.code.owner_name}/{self.code.name}'


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


class URLQuerySet(models.QuerySet):
    """ Custom queryset to provide handy shortcuts """

    def with_last_probe(self):
        """ Adds the most recent design rule session efficiently to the queryset """

        # Using postgres specific "DISTINCT ON". In combination with the order_by clause this
        # queries for the most recent probe per test url
        probe_qs = URLProbe.objects.order_by("url", "-timestamp").distinct("url")

        # Add the most recent probe to the original queryset. It will be available as
        # '_last_probe' attribute on the url object
        pf = Prefetch('urlprobe_set', queryset=probe_qs, to_attr='_prefetched_last_probe')
        return self.prefetch_related(pf)


class URL(models.Model):
    _last_probe = None

    objects = URLQuerySet.as_manager()

    url = models.CharField(max_length=MAX_URL_LENGTH, unique=True)
    # Todo: I expect that the number of uptime probes will become large, so we may want to cache
    #  some statistics about each url so we don't have to scan all uptime probes for a page load.
    #  However that can only be implemented once we know how we want to use the uptimes.

    class _DummyProbe:
        timestamp = None
        def ok(self): return None  # noqa
        def errmsg(self): return None  # noqa

    def last_probe(self):
        if hasattr(self, "_prefetched_last_probe"):
            if self._prefetched_last_probe:
                return self._prefetched_last_probe[0]
            return None
        if self._last_probe is None:
            self._last_probe = self.urlprobe_set.order_by('-timestamp').first() \
                or self._DummyProbe()
        return self._last_probe

    def last_timestamp(self):
        return self.last_probe().timestamp
    last_timestamp.short_description = "Last probe timestamp"

    def last_ok(self):
        return self.last_probe().ok()
    last_ok.boolean = True

    def last_errmsg(self):
        return self.last_probe().errmsg()
    last_errmsg.short_description = "Last error message"

    def used_in_api(self):
        return format_html(';<br>\n'.join(
            format_html('{} url for {}', link.field, link.api.api_id)
            for link in self.api_links.all()
        ))
    used_in_api.admin_order_field = 'api_links__api__api_id'

    def __str__(self):
        return self.url

    # Called from apps.CoreConfig.ready()
    # We cannot create querysets while models are being initialized, so these need to be set lazily
    @staticmethod
    def ready_hook():
        last_probe_query = URLProbe.objects.filter(url=OuterRef('id')).order_by('-timestamp')[:1]

        URL.last_timestamp.admin_order_field = Subquery(last_probe_query.values('timestamp'))

        URL.last_ok.admin_order_field = Subquery(
            last_probe_query.annotate(ok=URLProbe.ok.admin_order_field).values('ok'))

        URL.last_errmsg.admin_order_field = Subquery(
            last_probe_query.annotate(errmsg=URLProbe.errmsg.admin_order_field).values('errmsg'))


class URLProbe(models.Model):
    # Factor the url to a separate table to save space
    url = models.ForeignKey(URL, on_delete=models.PROTECT)
    timestamp = models.DateTimeField(auto_now_add=True)
    status_code = models.SmallIntegerField(null=True, blank=True)
    error = models.TextField(blank=True)

    def ok(self):
        return self.status_code == 200
    ok.boolean = True
    ok.admin_order_field = Case(
        When(status_code__exact=200, then=True),
        default=False,
        output_field=BooleanField()
    )

    def errmsg(self):
        if self.ok():
            return ''
        if self.status_code is not None:
            return f'HTTP status {self.status_code}'
        return self.error
    errmsg.admin_order_field = Case(
        When(status_code__exact=200, then=Value('')),
        When(status_code__isnull=False,
             then=Concat(Value('HTTP status '), 'status_code')),
        default='error',
        output_field=CharField()
    )

    def used_in_api(self):
        return format_html(';<br>\n'.join(
            format_html('{} url for {}', link.field, link.api.api_id)
            for link in self.url.api_links.all()
        ))
    used_in_api.admin_order_field = 'url__api_links__api__api_id'

    def __str__(self):
        status = 'ok' if self.ok() else self.errmsg()
        return f'{self.url.url}: {status}'


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


class APIDesignRuleTestSuite(models.Model):
    api = models.OneToOneField(
        "core.API",
        to_field="api_id",
        on_delete=models.CASCADE,
        related_name="test_suite"
    )
    uuid = models.UUIDField(null=True)
    api_endpoint = models.URLField(null=True)

    def last_design_rule_session(self):
        # first try to get the prefetched value if present, otherwise query the db
        try:
            last_session = self._last_session
        except AttributeError:
            return self.sessions.order_by("-started_at").first()
        else:
            # last_session is a list
            if last_session:
                return last_session[0]
        return None

    def __str__(self):
        return f"{self.api.api_id} - {self.uuid}"


class DesignRuleSession(models.Model):
    test_suite = models.ForeignKey(
        APIDesignRuleTestSuite, on_delete=models.CASCADE, related_name="sessions"
    )
    started_at = models.DateTimeField()
    percentage_score = models.DecimalField(default=0, decimal_places=2, max_digits=5)
    test_version = models.CharField(default="", max_length=TEST_VERSION_LENGTH)

    class Meta:
        ordering = ("-started_at", )


class DesignRuleResult(models.Model):
    session = models.ForeignKey(
        DesignRuleSession, on_delete=models.CASCADE, related_name="results"
    )
    rule_type_url = models.URLField()
    rule_type_name = models.CharField(max_length=RULE_TYPE_LENGTH, default="")
    rule_type_description = models.TextField(default="")
    success = models.BooleanField(default=False, blank=True)
    errors = ArrayField(
        models.CharField(max_length=ERROR_CHARFIELD_LENGTH), null=True
    )
