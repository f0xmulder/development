from django.contrib import admin

from .models import APIDesignRuleTestSuite


@admin.register(APIDesignRuleTestSuite)
class APIDesignRuleTestSuiteAdmin(admin.ModelAdmin):
    pass
