from django.db.models.signals import post_save
from django.dispatch import receiver

from core.models import API
from design_rules.tasks import create_test_suite, start_design_rule_session, APIPlatformException
from design_rules.models import APIDesignRuleTestSuite


@receiver(post_save, sender=API)
def create_test_suite(sender, instance, created, **kwargs):
    if created and instance.api_type == API.APIType.REST_JSON:
        test_suite = APIDesignRuleTestSuite.objects.create(api=instance)

        try:
            test_suite = create_test_suite(test_suite)
            start_design_rule_session(test_suite)
        except APIPlatformException:
            assert False, "Not working"
