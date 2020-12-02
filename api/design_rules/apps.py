from django.apps import AppConfig


class DesignRulesConfig(AppConfig):
    name = 'design_rules'

    def ready(self):
        # pylint:disable=import-outside-toplevel
        # Models cannot be imported at the toplevel in this file
        pass
