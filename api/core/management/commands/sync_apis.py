from django.core import management
from django.core.management.base import BaseCommand

from core.management.create_fixtures import create_fixtures
from core.models import API, Environment, Relation

COLOR_RED = '\033[91m'
COLOR_END = '\033[0m'


class Command(BaseCommand):
    def add_arguments(self, parser):
        parser.add_argument(
            '--api-dir',
            default='../data/apis',
            help='directory from which the api JSON files are read',
        )
        parser.add_argument(
            '--fixtures-dir',
            default='./core/fixtures',
            help='directory to which the fixture files are written',
        )

    def handle(self, *args, **options):
        apis = API.objects.all()
        apis.delete()

        if apis.count() > 0:
            raise SystemExit(
                COLOR_RED + 'Error: Not all APIs were deleted\nPlease delete all APIs before syncing'
                + COLOR_END)
        if Environment.objects.all().count() > 0:
            raise SystemExit(
                COLOR_RED + 'Error: Not all Environments were deleted\n'
                + 'Please delete all Environments before syncing' + COLOR_END)
        if Relation.objects.all().count() > 0:
            raise SystemExit(
                COLOR_RED + 'Error: Not all Relations were deleted\n'
                + 'Please delete all Relations before syncing' + COLOR_END)

        create_fixtures(options['api_dir'], options['fixtures_dir'])

        management.call_command('loaddata', 'apis')
