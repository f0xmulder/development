from django.contrib.postgres.fields import ArrayField
from django.db import models

from solo.models import SingletonModel


class DesignRulesConfiguration(SingletonModel):
    base_url = models.CharField(max_length=255, default="https://staging.api-test.nl/", help_text="The base url of the called environment, make sure that it ands with a slash")
    token = models.CharField(max_length=255, default='67d6c7b4ad656916bee7a2141a1414738515687f')
    default_version = models.IntegerField(help_text="This is the version that will be tested.", default=1)

    def __str__(self):
        return "Design rules Configuration"

    class Meta:
        verbose_name = "Design rules Configuration"


class APIDesignRuleTestSuite(models.Model):
    api = models.OneToOneField(
        "core.API",
        db_constraint=False,
        on_delete=models.CASCADE,
        null=True
    )
    uuid = models.UUIDField(null=True)

    def __str__(self):
        return "{} - {}".format(self.api.api_id, self.uuid)


class DesignRuleSession(models.Model):
    test_suite = models.ForeignKey(APIDesignRuleTestSuite, on_delete=models.CASCADE, related_name="sessions")
    started_at = models.DateTimeField()
    percentage_score = models.DecimalField(default=0, decimal_places=2, max_digits=5)
    test_version = models.CharField(default="", max_length=200)

    class Meta:
        ordering = ("-started_at", )


class DesignRuleResult(models.Model):
    session = models.ForeignKey(DesignRuleSession, on_delete=models.CASCADE, related_name="results")
    rule_type_url = models.URLField()
    rule_type_name = models.CharField(max_length=250, default="")
    rule_type_description = models.TextField(default="")
    success = models.BooleanField(default=False, blank=True)
    errors = ArrayField(
        models.CharField(max_length=500, blank=True), null=True, blank=True
    )
