from django.contrib import admin

from solo.admin import SingletonModelAdmin

from .models import APIDesignRuleTestSuite, DesignRulesConfiguration


admin.site.register(DesignRulesConfiguration, SingletonModelAdmin)


@admin.register(APIDesignRuleTestSuite)
class APIDesignRuleTestSuiteAdmin(admin.ModelAdmin):
    pass
