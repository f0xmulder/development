import requests

from design_rules.models import DesignRulesConfiguration, DesignRuleSession, DesignRuleResult


class APIPlatformException(Exception):
    pass


def create_test_suite(api_design_rule_test_suite):
    config = DesignRulesConfiguration.get_solo()
    url = "{}api/v1/designrule-testsuite".format(config.base_url)
    if not api_design_rule_test_suite.api.get_production_environment():
        raise APIPlatformException("No production environment found")
    spec_url = api_design_rule_test_suite.api.get_production_environment().get_specification_url()
    data = {
        "api_endpoint": spec_url
    }
    headers = {'Authorization': 'Token {}'.format(config.token)}
    response = requests.post(url, data=data, headers=headers)
    if response.ok:
        api_design_rule_test_suite.uuid = response.json().get('uuid')
        api_design_rule_test_suite.api_endpoint = response.json().get('api_endpoint')
        api_design_rule_test_suite.save()
        return api_design_rule_test_suite
    raise APIPlatformException(response.json())


def get_test_suite(api_design_rule_test_suite):
    config = DesignRulesConfiguration.get_solo()
    url = "{}api/v1/designrule-testsuite/{}".format(config.base_url, api_design_rule_test_suite.uuid)
    headers = {'Authorization': 'Token {}'.format(config.token)}
    response = requests.get(url, headers=headers)
    if response.ok:
        return response.json()
    raise APIPlatformException(response.json())


def update_api_endpoint(api_design_rule_test_suite, api_endpoint):
    config = DesignRulesConfiguration.get_solo()
    url = "{}api/v1/designrule-testsuite/{}".format(config.base_url, api_design_rule_test_suite.uuid)
    data = {
        "api_endpoint": api_endpoint
    }
    headers = {'Authorization': 'Token {}'.format(config.token)}
    response = requests.put(url, data=data, headers=headers)
    if response.ok:
        api_design_rule_test_suite.api_endpoint = response.json().get('api_endpoint')
        api_design_rule_test_suite.save()
        return api_design_rule_test_suite
    raise APIPlatformException(response.json())


def get_all_sessions_urls(api_design_rule_test_suite):
    config = DesignRulesConfiguration.get_solo()
    url = "{}api/v1/designrule-testsuite/{}".format(
        config.base_url, str(api_design_rule_test_suite.uuid)
    )
    headers = {'Authorization': 'Token {}'.format(config.token)}
    response = requests.get(url, headers=headers)
    if response.ok:
        return response.json().get('sessions')
    raise APIPlatformException(response.json())


def start_design_rule_session(api_design_rule_test_suite, version=None):
    config = DesignRulesConfiguration.get_solo()
    url = "{}api/v1/designrule-testsuite/{}/start_session".format(
        config.base_url, str(api_design_rule_test_suite.uuid)
    )

    if not version:
        version = config.default_version

    data = {"test_version": version}
    headers = {'Authorization': 'Token {}'.format(config.token)}
    response = requests.post(url, data=data, headers=headers)
    if response.ok:
        response_dict = response.json()
        session = DesignRuleSession.objects.create(
            test_suite=api_design_rule_test_suite,
            started_at=response_dict.get("started_at"),
            percentage_score=response_dict.get("percentage_score"),
            test_version=response_dict.get("test_version", ""),
        )

        results = response_dict.get("results")
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
    raise APIPlatformException(response.json())


def get_session(session_url):
    config = DesignRulesConfiguration.get_solo()
    headers = {'Authorization': 'Token {}'.format(config.token)}
    response = requests.get(session_url, headers=headers)

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
