import os

# Build paths inside the project like this: os.path.join(BASE_DIR, ...)
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

DEBUG_DEFAULT = 'True'
SECRET_KEY_DEFAULT = '0)l39j8gmr17ygx@7oia_x#x$o@t4qh&dx^$o4j+fjfi-3-0=7'  # noqa
USE_X_FORWARDED_PORT_DEFAULT = 'True'

if os.getenv('DON_ENVIRONMENT') == 'production':
    DEBUG_DEFAULT = 'False'
    SECRET_KEY_DEFAULT = None
    USE_X_FORWARDED_PORT_DEFAULT = 'False'

DEBUG = os.getenv('DEBUG', DEBUG_DEFAULT) == 'True'
SECRET_KEY = os.getenv('SECRET_KEY', SECRET_KEY_DEFAULT)

USE_X_FORWARDED_PORT = os.getenv('USE_X_FORWARDED_PORT', USE_X_FORWARDED_PORT_DEFAULT) == 'True'

if os.getenv('ALLOWED_HOST'):
    ALLOWED_HOSTS = [os.getenv('ALLOWED_HOST')]

GITLAB = {
    'ACCESS_TOKEN': os.environ.get('GITLAB_ACCESS_TOKEN'),
    'PROJECT_ID': os.environ.get('GITLAB_PROJECT_ID'),
    'URL': os.environ.get('GITLAB_URL'),
}

# Application definition

INSTALLED_APPS = [
    'core.apps.CoreConfig',
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'rest_framework',
    'solo',
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'api.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'api.wsgi.application'

# Application behaviour
APPEND_SLASH = False


# Database
# https://docs.djangoproject.com/en/3.0/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'HOST': os.getenv('DB_HOST', 'localhost'),
        'USER': os.getenv('DB_USER', 'don'),
        'PASSWORD': os.getenv('DB_PASSWORD', 'don'),
        'NAME': os.getenv('DB_NAME', 'don'),
        'CONN_MAX_AGE': None,
        'OPTIONS': {
            'application_name': "don_api",
            'keepalives': "1",
            'keepalives_idle': "120",
            'keepalives_interval': "20",
        }
    }
}

DEFAULT_AUTO_FIELD = 'django.db.models.AutoField'

# Password validation
# https://docs.djangoproject.com/en/3.0/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]

LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'handlers': {
        'console': {
            'class': 'logging.StreamHandler',
        },
    },
    'loggers': {
        'django': {
            'handlers': ['console'],
            'level': os.getenv('DJANGO_LOG_LEVEL', 'INFO'),
        },
        # Uncomment to log database queries:
        # 'django.db.backends': {
        #     'level': 'DEBUG',
        # },
    }
}

# Internationalization
# https://docs.djangoproject.com/en/3.0/topics/i18n/

LANGUAGE_CODE = 'en-gb'

TIME_ZONE = 'Europe/Amsterdam'

USE_I18N = True

USE_L10N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/3.0/howto/static-files/

STATIC_URL = '/admin/static/'
STATIC_ROOT = '/app/static'

# Design Rule settings
API_TEST_BASE_URL_DEFAULT = "https://staging.api-test.nl/"

API_TEST_BASE_URL = os.getenv('API_TEST_BASE_URL', API_TEST_BASE_URL_DEFAULT)
API_TEST_TOKEN = os.getenv('API_TEST_TOKEN')
API_TEST_DEFAULT_VERSION = os.getenv('API_TEST_DEFAULT_VERSION', "2")
