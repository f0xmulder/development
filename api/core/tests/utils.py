from functools import wraps
import logging


def prevent_logging(func):
    """ Wraps a function to prevent it from outputting any logging

    Used to disable logging to console when running tests

    """
    @wraps(func)
    def wrapped_func(*args, **kwargs):
        logging.disable()
        try:
            func(*args, **kwargs)
        finally:
            logging.disable(logging.NOTSET)

    return wrapped_func
