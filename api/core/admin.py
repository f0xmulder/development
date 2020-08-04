from django.contrib import admin
from .models import Badge, APIBadge, Event


@admin.register(Badge)
class BadgeAdmin(admin.ModelAdmin):
    pass


@admin.register(APIBadge)
class APIBadgeAdmin(admin.ModelAdmin):
    pass


@admin.register(Event)
class EventAdmin(admin.ModelAdmin):
    list_display = ['start_date', 'title', 'is_published']
