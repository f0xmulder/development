from django.test import TransactionTestCase

from core.models import API


class TestFixture(TransactionTestCase):
    fixtures = ["core_testdata"]

    def test_fixtures_present(self):
        self.assertTrue(API.objects.all().exists())
