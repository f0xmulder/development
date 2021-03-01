from django.core.management.base import BaseCommand

from core.models import Config


class Command(BaseCommand):
    def add_arguments(self, parser):
        parser.add_argument(
            'option',
            help="Option to enable. Supported values: 'linkchecker'")
        parser.add_argument(
            'value',
            choices=('true', 'false'),
            help="The value to set.")
        parser.add_argument(
            '--ifnotset',
            action='store_true',
            help="Only set a value if no value is already configured")

    def handle(self, *args, **options):
        option = options['option']
        value = options['value']
        ifnotset = options['ifnotset']
        bvalue = value == 'true'

        try:
            conf = Config.objects.get(variable=option)
            self.stdout.write("Old value for {}: {}".format(
                conf.variable, str(conf.enabled).lower()))
            if ifnotset:
                return
        except Config.DoesNotExist:
            conf = Config(variable=option, enabled=bvalue)
            self.stdout.write(f"Old value for {option}: not set")

        conf.enabled = bvalue
        conf.save()
        self.stdout.write(f"new value: {value}")
