from django.conf import settings

import requests

from core.models import DesignRuleSession, DesignRuleResult

if not settings.API_TEST_TOKEN:
    Exception("The API_TEST_TOKEN environment variable must be set to be able to make the api "
              "calls.")

AUTH_HEADERS = {'Authorization': 'Token {}'.format(settings.API_TEST_TOKEN)}


class APIPlatformException(Exception):
    pass


def _get(url):
    response = requests.get(url, headers=AUTH_HEADERS)
    response.raise_for_status()
    return response.json()


def _post(url, data):
    response = requests.post(url, data=data, headers=AUTH_HEADERS)
    response.raise_for_status()
    return response.json()


def _put(url, data):
    response = requests.put(url, data=data, headers=AUTH_HEADERS)
    response.raise_for_status()
    return response.json()


def create_test_suite(test_suite):
    if not test_suite.api.get_production_environment():
        raise APIPlatformException("No production environment found")

    url = f"{settings.API_TEST_BASE_URL}api/v1/designrule-testsuite"
    data = {"api_endpoint": test_suite.api.get_production_environment().api_url}
    response = _post(url, data)
    test_suite.uuid = response.get('uuid')
    test_suite.api_endpoint = response.get('api_endpoint')
    test_suite.save()
    return test_suite


def get_test_suite(test_suite):
    url = f"{settings.API_TEST_BASE_URL}api/v1/designrule-testsuite/{test_suite.uuid}"
    return _get(url)


def update_api_endpoint(test_suite, api_endpoint):
    url = f"{settings.API_TEST_BASE_URL}api/v1/designrule-testsuite/{test_suite.uuid}"
    data = {"api_endpoint": api_endpoint}
    response = _put(url, data)
    test_suite.api_endpoint = response.get('api_endpoint')
    test_suite.save()
    return test_suite


def get_all_sessions_urls(test_suite):
    url = f"{settings.API_TEST_BASE_URL}api/v1/designrule-testsuite/{test_suite.uuid}"
    return _get(url).get('sessions')


def start_design_rule_session(test_suite, version=settings.API_TEST_DEFAULT_VERSION):
    url = f"{settings.API_TEST_BASE_URL}api/v1/designrule-testsuite"
    url += f"/{str(test_suite.uuid)}/start_session"
    data = {"test_version": version}
    response = _post(url, data)
    session = DesignRuleSession.objects.create(
        test_suite=test_suite,
        started_at=response.get("started_at"),
        percentage_score=response.get("percentage_score"),
        test_version=response.get("test_version", ""),
    )

    results = response.get("results")
    for result in results:
        DesignRuleResult.objects.create(
            session=session,
            rule_type_url=result.get("url"),
            rule_type_name=result.get("rule_type"),
            rule_type_description=result.get("description"),
            success=result.get("success"),
            errors=result.get("errors"),
        )
    return session


def get_session(session_url):
    return _get(session_url)


def get_versions():
    """
    Returning a list of the versions with the primary key and the name
    """
    url = f"{settings.API_TEST_BASE_URL}api/v1/designrule-testversion"
    return _get(url)
