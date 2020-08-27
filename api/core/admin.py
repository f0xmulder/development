from django.contrib import admin
from django.db.models import BooleanField, Subquery, OuterRef, Case, When

from .models import Badge, APIBadge, Event, URL, URLProbe, URLApiLink, Config


@admin.register(Badge)
class BadgeAdmin(admin.ModelAdmin):
    pass


@admin.register(APIBadge)
class APIBadgeAdmin(admin.ModelAdmin):
    pass


@admin.register(Event)
class EventAdmin(admin.ModelAdmin):
    list_display = ['start_date', 'title', 'is_published']


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
                      .annotate(ok=Case(When(status_code__exact=200, then=True),
                                        default=False,
                                        output_field=BooleanField()))
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
        return (('ok', 'ok'), ('error', 'error'), ('none', 'none'))


@admin.register(URL)
class URLAdmin(admin.ModelAdmin):
    # The last_ok and last_error cause one query per displayed url, so those are relatively slow
    list_display = ['url', 'used_in_api', 'last_ok', 'last_error']
    list_filter = [URLLastOkFilter, 'api_links__field', 'api_links__api__api_id', 'url']
    inlines = [URLProbeInline]

    # An optimization for the admin list page. The prefetch doesn't help for the probe_set used in
    # last_ok.
    def get_queryset(self, request):
        return super().get_queryset(request).prefetch_related('api_links', 'api_links__api')


class URLProbeOkFilter(admin.SimpleListFilter):
    title = 'OK'
    parameter_name = 'ok'

    def lookups(self, request, model_admin):
        return (('ok', 'ok'), ('error', 'error'))

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
