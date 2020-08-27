from io import StringIO

from django.core.management import call_command
from django.test import TestCase

from core.models import Config


class SetOptionTest(TestCase):

    def test_linkchecker(self):

        assert Config.objects.filter(variable='linkchecker').first() is None

        call_command('set_option', 'linkchecker', 'true', '--ifnotset', stdout=StringIO())
        assert Config.objects.get(variable='linkchecker').enabled

        call_command('set_option', 'linkchecker', 'true', stdout=StringIO())
        assert Config.objects.get(variable='linkchecker').enabled

        call_command('set_option', 'linkchecker', 'false', '--ifnotset', stdout=StringIO())
        assert Config.objects.get(variable='linkchecker').enabled

        call_command('set_option', 'linkchecker', 'false', stdout=StringIO())
        assert not Config.objects.get(variable='linkchecker').enabled
