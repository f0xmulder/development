from unittest.mock import Mock, MagicMock, PropertyMock


def mock_response(status_code,
                  data='',
                  content_type='text/plain'):
    """
    Returns a mock with some basic requests.Response functionality:
    status_code, ok, content, text and headers.get['Content-Type']
    """

    _status_code = status_code

    bdata = bytes(str(data), 'UTF-8')

    class MockResponse (MagicMock):

        headers = Mock()
        headers.get = Mock(side_effect={'Content-Type': content_type}.__getitem__)

        status_code = PropertyMock(return_value=_status_code)
        ok = PropertyMock(return_value=_status_code < 400)
        content = PropertyMock(return_value=bdata)
        text = PropertyMock(return_value=data)

    return MockResponse()
