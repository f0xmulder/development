from rest_framework.exceptions import APIException


class APIStatusCodeException(APIException):
    """A Django exception for which the status code can be specified in the constructor"""
    def __init__(self, detail, status_code):
        self.status_code = status_code
        super().__init__(detail=detail)
