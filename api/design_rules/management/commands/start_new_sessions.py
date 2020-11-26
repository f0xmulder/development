import logging
import os
import sys

from django.contrib.auth import get_user_model
from django.core.exceptions import ObjectDoesNotExist
from django.core.management.base import BaseCommand

from core.models import API

from design_rules.tasks import start_design_rule_session, create_test_suite, APIPlatformException
from design_rules.models import APIDesignRuleTestSuite

logger = logging.getLogger(__name__)


class Command(BaseCommand):
    def handle(self, *args, **options):
        for api in API.objects.all():
            if api.is_rest():
                try:
                    test_suite = api.test_suite
                    if not test_suite.uuid:
                        try:
                            test_suite = create_test_suite(test_suite)
                        except APIPlatformException as e:
                            logger.exception(e)
                            continue
                except ObjectDoesNotExist:
                    test_suite = APIDesignRuleTestSuite.objects.create(api=api)
                    try:
                        test_suite = create_test_suite(test_suite)
                    except APIPlatformException as e:
                        logger.exception(e)
                        continue
                try:
                    start_design_rule_session(test_suite)
                except APIPlatformException as e:
                    logger.exception(e)
