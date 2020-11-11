import requests


def get_all_sessions(api_design_rule_test_suite):
    url = "https://staging.api-test.nl/api/v1/designrule-testsuite/{}".format(str(api_design_rule_test_suite.uuid))
    print(url)
    response = requests.get(url, headers={'Authorization': 'Token 67d6c7b4ad656916bee7a2141a1414738515687f'})
    print(response.ok)
    print(response.status_code)
    print(response.text)


def start_design_rule_session():
    pass
