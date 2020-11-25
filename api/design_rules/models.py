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
    environment = models.ForeignKey(
        "core.Environment",
        db_constraint=False,
        on_delete=models.CASCADE,
        null=True
    )
    uuid = models.UUIDField(null=True)

    def __str__(self):
        return "{} - {}".format(self.environment.api_url, self.uuid)


class DesignRuleSession(models.Model):
    # foreign_key
    # started_at
    percentage_score = models.DecimalField(default=0, decimal_places=2, max_digits=5)
    test_version = models.ForeignKey(DesignRuleTestVersion, null=True, on_delete=models.CASCADE)

    class Meta:
        ordering = ("-started_at", )


class DesignRuleResult(models.Model):
    design_rule = models.ForeignKey(DesignRuleSession, on_delete=models.CASCADE, related_name="results")
    # url
    # rule_type_name
    # Rule_type_description
    success = models.BooleanField(default=False, blank=True)
    errors = ArrayField(
        models.CharField(max_length=500, blank=True), null=True, blank=True
    )
