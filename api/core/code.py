import logging
import re
import urllib.parse
import requests
from dateutil import parser

from django.conf import settings
from django.db import IntegrityError
from rest_framework import status
from rest_framework.exceptions import ParseError
from requests import HTTPError
from core.models import Code, ProgrammingLanguage
from core.exceptions import APIStatusCodeException

logger = logging.getLogger(__name__)

GITLAB_API = 'https://gitlab.com/api/v4'
GITHUB_API = 'https://api.github.com'


def parse_code(code_data):
    # GitLab
    match_object = re.match(r'https?://(www.)?gitlab.com/(.*)$', code_data['url'])
    if match_object:
        gitlab_path = match_object.group(2)

        match_object_snippet = re.match(r'^.*-/snippets/(\d+)$', gitlab_path)
        # Snippet
        if match_object_snippet:
            parse_gitlab_snippet(code_data, match_object_snippet.group(1))
        # Repository
        else:
            parse_gitlab_repo(code_data, gitlab_path)

        return

    # GitHub repository
    match_object = re.match(r'https?://(www.)?github.com/(.*/.*)/?$', code_data['url'])
    if match_object:
        parse_github_repo(code_data, match_object.group(2))
        return

    # GitHub gist
    match_object = re.match(r'https?://gist.github.com/.*/(.*)/?$', code_data['url'])
    if match_object:
        parse_github_gist(code_data, match_object.group(1))
        return

    raise ParseError("de URL is geen GitLab of GitHub URL")


# GitLab repository
def parse_gitlab_repo(code_data, gitlab_path):
    gitlab_api_project_path = urllib.parse.quote(gitlab_path.rstrip('/'), safe='')
    response = requests.get(
        f'{GITLAB_API}/projects/{gitlab_api_project_path}'
    )
    try_raise_for_status(response)
    result = response.json()

    description = ''
    if result['description']:
        description = result['description']

    code = Code(
        source=Code.Source.GITLAB,
        owner_name=result['namespace']['full_path'],
        name=result['name'],
        url=result['web_url'],
        description=description,
        last_change=parser.parse(result['last_activity_at']),
        stars=result['star_count'],
    )

    try_save_code(code)

    save_related_apis(code, code_data)

    # Retrieve and save programming languages
    response = requests.get(
        f'{GITLAB_API}/projects/{gitlab_api_project_path}/languages'
    )
    # No need to check response.raise_for_status() as this data is not essential
    if response.status_code == 200:
        save_programming_languages(code, response.json().keys())
    else:
        logger.error(
            "Error retrieving GitLab API programming languages: status %s: %s",
            response.status_code,
            response.content
        )


# GitLab snippet
def parse_gitlab_snippet(code_data, snippet_id):
    # For some reason GitLab requires authentication when retrieving
    # snippets from their API
    response = requests.get(
        f'{GITLAB_API}/snippets/{snippet_id}',
        headers={'PRIVATE-TOKEN': settings.GITLAB.get('ACCESS_TOKEN')}
    )
    try_raise_for_status(response)
    result = response.json()

    description = ''
    if result['description']:
        description = result['description']

    code = Code(
        source=Code.Source.GITLAB_SNIPPET,
        owner_name=result['author']['username'],
        name=result['title'],
        url=result['web_url'],
        description=description,
        last_change=parser.parse(result['updated_at']),
        # GitLab snippets don't have stars,
        stars=None,
    )

    try_save_code(code)

    save_related_apis(code, code_data)


# GitHub repository
def parse_github_repo(code_data, github_path):
    response = requests.get(
        f'{GITHUB_API}/repos/{github_path}'
    )
    try_raise_for_status(response)
    result = response.json()

    description = ''
    if result['description']:
        description = result['description']

    code = Code(
        source=Code.Source.GITHUB,
        owner_name=result['owner']['login'],
        name=result['name'],
        url=result['html_url'],
        description=description,
        last_change=parser.parse(result['updated_at']),
        stars=result['stargazers_count'],
    )

    try_save_code(code)

    save_related_apis(code, code_data)

    # Retrieve and save programming languages
    response = requests.get(
        f'{GITHUB_API}/repos/{github_path}/languages'
    )
    # No need to check response.raise_for_status() as this data is not essential
    if response.status_code == 200:
        save_programming_languages(code, response.json().keys())
    else:
        logger.error(
            "Error retrieving GitHub API programming languages: status %s: %s",
            response.status_code,
            response.content
        )


# GitHub gist
def parse_github_gist(code_data, gist_id):
    response = requests.get(
        f'{GITHUB_API}/gists/{gist_id}'
    )
    try_raise_for_status(response)
    result = response.json()

    description = ''
    if result['description']:
        description = result['description']

    code = Code(
        source=Code.Source.GITHUB_GIST,
        owner_name=result['owner']['login'],
        name=list(result['files'].items())[0][0],
        url=result['html_url'],
        description=description,
        last_change=parser.parse(result['updated_at']),
        # GitHub gists have stars, but this info is not available via their API
        stars=None,
    )

    try_save_code(code)

    save_related_apis(code, code_data)

    # Save programming languages
    save_programming_languages(code, [x['language'] for x in result['files'].values()])


def save_related_apis(code, code_data):
    for related_api in code_data['related_apis']:
        code.related_apis.add(related_api['api_id'])
        code.save()


def save_programming_languages(code, names):
    for name in names:
        if name:
            programming_language, _ = ProgrammingLanguage.objects.get_or_create(name=name)
            code.programming_languages.add(programming_language)
            code.save()


def try_save_code(code):
    try:
        code.save()
    except IntegrityError as e:
        logger.error(e)
        # The canonical URL is already in the database
        raise APIStatusCodeException("de URL is eerder toegevoegd",
                                     status_code=status.HTTP_409_CONFLICT)


def try_raise_for_status(response):
    try:
        response.raise_for_status()
    except HTTPError as e:
        logger.error(e)
        # Something went wrong with a request to the GitLab or GitHub API
        raise APIStatusCodeException(
            "het ophalen van gegevens uit een externe API is mislukt",
            status_code=status.HTTP_502_BAD_GATEWAY
        )
