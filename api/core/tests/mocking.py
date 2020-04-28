from unittest.mock import Mock


def mock_response(status_code,
                  status_exception=None,
                  json_data=None):
    """
    Returns a mock with some basic requests.Response functionality:
    status_code, raise_for_status() and json()
    """
    response = Mock()
    response.status_code = status_code

    if status_exception:
        response.raise_for_status = Mock(side_effect=status_exception)

    if json_data:
        response.json = Mock(return_value=json_data)
    else:
        response.json = Mock(side_effect=ValueError('No JSON object could be decoded'))

    return response
