import requests
from django.core.exceptions import ImproperlyConfigured
from django.conf import settings

REQUEST_TIMEOUT_SECONDS = 10


def create_issue(title, description, labels):
    if not settings.GITLAB.get('ACCESS_TOKEN'):
        raise ImproperlyConfigured('Gitlab access token is missing.')

    if not settings.GITLAB.get('PROJECT_ID'):
        raise ImproperlyConfigured('Gitlab project id is missing.')

    if not settings.GITLAB.get('URL'):
        raise ImproperlyConfigured('Gitlab URL is missing.')

    headers = {
        'Content-Type': 'application/json',
        'PRIVATE-TOKEN': settings.GITLAB['ACCESS_TOKEN'],
    }

    body = {
        'title': title,
        'description': description,
        'labels': labels
    }

    url = f'{settings.GITLAB["URL"]}/api/v4/projects/{settings.GITLAB["PROJECT_ID"]}/issues'

    response = requests.post(url, json=body, headers=headers, timeout=REQUEST_TIMEOUT_SECONDS)
    response.raise_for_status()

    return response.json()
