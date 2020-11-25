import requests

from design_rules.models import DesignRulesConfiguration

class APIPlatformException(Exception):
    pass


def create_test_suite(api_design_rule_test_suite):
    config = DesignRulesConfiguration.get_solo()
    url = "{}api/v1/designrule-testsuite".format(config.base_url)
    data = {
        "api_endpoint": api_design_rule_test_suite.environment.get_specification_url()
    }
    response = requests.post(url, data=data, headers={'Authorization': 'Token {}'.format(config.token)})
    if response.ok:
        api_design_rule_test_suite.uuid = response.json().get('uuid')
        api_design_rule_test_suite.save()
        return api_design_rule_test_suite
    raise APIPlatformException(response.json())


def get_all_sessions_urls(api_design_rule_test_suite):
    config = DesignRulesConfiguration.get_solo()
    url = "{}api/v1/designrule-testsuite/{}".format(config.base_url, str(api_design_rule_test_suite.uuid))
    response = requests.get(url, headers={'Authorization': 'Token {}'.format(config.token)})
    if response.ok:
        return response.json().get('sessions')
    raise APIPlatformException(response.json())


def start_design_rule_session(api_design_rule_test_suite, version=None):
    config = DesignRulesConfiguration.get_solo()
    url = "{}api/v1/designrule-testsuite/{}/start_session".format(config.base_url, str(api_design_rule_test_suite.uuid))

    if not version:
        version = config.default_version

    data = {
        "test_version": version
    }
    response = requests.post(url, data=data, headers={'Authorization': 'Token {}'.format(config.token)})
    if response.ok:
        return response.json()
    raise APIPlatformException(response.json())


def get_session(session_url):
    config = DesignRulesConfiguration.get_solo()
    response = requests.get(session_url, headers={'Authorization': 'Token {}'.format(config.token)})

    if response.ok:
        return response.json()
    raise APIPlatformException(response.json())


def get_versions():
    """
    Returning a list of the versions with the primary key and the name
    """
    config = DesignRulesConfiguration.get_solo()
    url = "{}api/v1/designrule-testversion".format(config.base_url)
    response = requests.get(url, headers={'Authorization': 'Token {}'.format(config.token)})
    if response.ok:
        return response.json()
    raise APIPlatformException(response.json())
