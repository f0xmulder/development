from django.contrib import admin
from django.db.models import Subquery, OuterRef, Count

from .models import (
    Badge, APIBadge, Event, Code, URL, URLProbe, URLApiLink, Config, CodeAPI,
    APIDesignRuleTestSuite
)


@admin.register(APIDesignRuleTestSuite)
class APIDesignRuleTestSuiteAdmin(admin.ModelAdmin):

    def get_queryset(self, request):
        return super().get_queryset(request).select_related("api")


@admin.register(Badge)
class BadgeAdmin(admin.ModelAdmin):
    pass


@admin.register(APIBadge)
class APIBadgeAdmin(admin.ModelAdmin):
    pass


@admin.register(Event)
class EventAdmin(admin.ModelAdmin):
    list_display = ['start_date', 'title', 'is_published']


class CodeAPIInline(admin.StackedInline):
    model = CodeAPI
    extra = 0


@admin.register(Code)
class CodeAdmin(admin.ModelAdmin):
    list_display_links = ['name']
    list_display = ['source', 'owner_name', 'name', 'url', 'programming_languages_string',
                    'related_apis_string']
    list_filter = ['source', 'owner_name', 'programming_languages', 'related_apis']
    inlines = [CodeAPIInline]

    def get_queryset(self, request):
        return super().get_queryset(request).prefetch_related(
            "programming_languages", "related_apis")


@admin.register(CodeAPI)
class CodeAPIAdmin(admin.ModelAdmin):
    list_display = ['code', 'api']
    list_filter = list_display


class URLProbeInline(admin.TabularInline):
    model = URLProbe
    ordering = ['-timestamp']
    readonly_fields = ['timestamp', 'ok', 'status_code', 'error']
    extra = 0


class URLLastOkFilter(admin.SimpleListFilter):
    title = 'Last probe OK'
    parameter_name = 'last_ok'

    _last_probe_ok = (URLProbe.objects
                      .filter(url=OuterRef('id'))
                      .order_by('-timestamp')[:1]
                      .annotate(ok=URLProbe.ok.admin_order_field)
                      .values('ok'))

    def queryset(self, request, queryset):
        if self.value() == 'ok':
            return queryset.annotate(ok=Subquery(self._last_probe_ok)).filter(ok__exact=True)
        if self.value() == 'error':
            return queryset.annotate(ok=Subquery(self._last_probe_ok)).filter(ok__exact=False)
        if self.value() == 'none':
            return queryset.annotate(ok=Subquery(self._last_probe_ok)).filter(ok__exact=None)
        return None  # required by pylint

    def lookups(self, request, model_admin):
        return (('ok', 'Ok'), ('error', 'Error'), ('none', 'No probes'))


class URLInUseFilter(admin.SimpleListFilter):
    title = "URL in use"
    parameter_name = 'in_use'

    def lookups(self, request, model_admin):
        return (('all', 'All'), (None, 'In use'), ('unused', 'Unused'))

    # Override to suppress the default 'All' option
    def choices(self, changelist):
        for lookup, title in self.lookup_choices:
            yield {
                'selected': self.value() == lookup,
                'query_string': changelist.get_query_string({self.parameter_name: lookup}),
                'display': title,
            }

    def queryset(self, request, queryset):
        if self.value() == 'all':
            return queryset
        if self.value() is None:
            return queryset.annotate(Count('api_links')).filter(api_links__count__gt=0)
        if self.value() == 'unused':
            return queryset.annotate(Count('api_links')).filter(api_links__count__exact=0)
        return None  # required by pylint


@admin.register(URL)
class URLAdmin(admin.ModelAdmin):
    # The last_ok and last_errmsg cause one query per displayed url, so those are relatively slow
    list_display = ['url', 'used_in_api', 'last_timestamp', 'last_ok', 'last_errmsg']
    list_filter = [URLLastOkFilter, URLInUseFilter, 'api_links__field', 'api_links__api__api_id',
                   'url']
    inlines = [URLProbeInline]

    # An optimization for the admin list page. The prefetch doesn't help for the probe_set used in
    # last_ok.
    def get_queryset(self, request):
        return super().get_queryset(request).with_last_probe().prefetch_related('api_links', 'api_links__api')


class URLProbeOkFilter(admin.SimpleListFilter):
    title = 'OK'
    parameter_name = 'ok'

    def lookups(self, request, model_admin):
        return (('ok', 'Ok'), ('error', 'Error'))

    def queryset(self, request, queryset):
        if self.value() == 'ok':
            return queryset.filter(status_code__exact=200)
        if self.value() == 'error':
            return queryset.exclude(status_code__exact=200)
        return None  # required by pylint


@admin.register(URLProbe)
class URLProbeAdmin(admin.ModelAdmin):
    date_hierarchy = 'timestamp'
    list_display = ['timestamp', 'url', 'used_in_api', 'ok', 'status_code', 'error']
    list_filter = ['timestamp', URLProbeOkFilter, 'status_code', 'url__api_links__field',
                   'url__api_links__api__api_id', 'url']

    def get_queryset(self, request):
        return super().get_queryset(request).prefetch_related(
            'url__api_links', 'url__api_links__api')


@admin.register(URLApiLink)
class URLApiLinkAdmin(admin.ModelAdmin):
    list_display = ['api', 'field', 'url']
    list_filter = ['field', 'api', 'url']


@admin.register(Config)
class ConfigAdmin(admin.ModelAdmin):
    list_display = ['variable', 'enabled']
    list_editable = ['enabled']
