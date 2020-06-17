import os
import sys

from django.contrib.auth import get_user_model
from django.core.management.base import BaseCommand

# The same env var as used by `manage.py createsuperuser`
PASSWORD_ENV_VAR = 'DJANGO_SUPERUSER_PASSWORD'


class Command(BaseCommand):
    def add_arguments(self, parser):
        parser.add_argument('--username', default='admin')
        parser.add_argument('--email', default='admin@example.com')

    def handle(self, *args, **options):
        password = os.environ.get(PASSWORD_ENV_VAR)
        if not password:
            sys.exit(f'Please set the {PASSWORD_ENV_VAR} env var before calling this command')

        user_model = get_user_model()
        username = options['username']

        if user_model.objects.filter(username=username).exists():
            print(f'User {username} already exists')
        else:
            user_model.objects.create_superuser(username=username,
                                                email=options['email'],
                                                password=password)
            print(f'Successfully created user {username}')
