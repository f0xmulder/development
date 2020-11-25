from django.apps import AppConfig


class CoreConfig(AppConfig):
    name = 'core'

    def ready(self):
        # pylint:disable=import-outside-toplevel
        # Models cannot be imported at the toplevel in this file
        from .models import URL
        URL.ready_hook()
