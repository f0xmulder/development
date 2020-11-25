import os
import sys

from django.contrib.auth import get_user_model
from django.core.management.base import BaseCommand

from design_rules.tasks import start_design_rule_session
from design_rules.models import APIDesignRuleTestSuite


class Command(BaseCommand):
    def handle(self, *args, **options):
        for test_suite in APIDesignRuleTestSuite.objects.all():
            if test_suite.uuid:
                start_design_rule_session(test_suite)
