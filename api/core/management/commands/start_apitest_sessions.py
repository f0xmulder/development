import logging
import sys

from django.core.exceptions import ObjectDoesNotExist
from django.core.management.base import BaseCommand, CommandError

from requests import HTTPError

from core.api_test_calls import (
    start_design_rule_session, create_test_suite, APIPlatformException,
    update_api_endpoint
)
from core.models import API, APIDesignRuleTestSuite

logger = logging.getLogger(__name__)


class Command(BaseCommand):
    help = """This command is used to create a new test-session in api-test.
    To make sure that a test can be run, this command will also create and/or update the api in
    api-test if needed. This will ensure that what we want to test is available for testing.
    """

    def get_or_create_test_suite(self, api):
        try:
            test_suite = api.test_suite
            if test_suite.uuid:
                return test_suite
            return create_test_suite(test_suite)
        except ObjectDoesNotExist:
            test_suite = APIDesignRuleTestSuite.objects.create(api=api)
            return create_test_suite(test_suite)

    def check_url_change(self, test_suite, api):
        # Check if the api endpoint is updated
        api_endpoint = api.get_production_environment().api_url
        if test_suite.api_endpoint != api_endpoint:
            update_api_endpoint(test_suite, api_endpoint)

    def handle(self, *args, **options):
        had_errors = False
        for api in API.objects.filter(api_type__in=[API.APIType.REST_JSON, API.APIType.REST_XML]):
            try:
                # GET or CREATE a test_suite
                test_suite = self.get_or_create_test_suite(api)
                # Update the endpoint in the test_suite
                self.check_url_change(test_suite, api)
                # Start a new session
                start_design_rule_session(test_suite)
            except (APIPlatformException, HTTPError) as e:
                had_errors = True
                logger.exception(e)
            print('.', end='', file=sys.stderr, flush=True)
        print(file=sys.stderr, flush=True)

        if had_errors:
            raise CommandError("Errors were encountered while attempting to start sessions. See "
                               "previous output for details.")
