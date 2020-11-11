from django.db import models


class APIDesignRuleTestSuite(models.Model):
    api = models.ForeignKey(
        "core.API",
        to_field='api_id',
        db_constraint=False,
        on_delete=models.DO_NOTHING,
    )
    uuid = models.UUIDField(null=True)

    def __str__(self):
        return "{} - {}".format(self.api, self.uuid)
