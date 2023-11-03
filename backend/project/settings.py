from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent

SECRET_KEY = 'django-insecure-z84!52@w2f*&f7ecswc@)@t)%wasw2rjqv@q+mrdll6j7exja9'

DEBUG = True

# 追加
ALLOWED_HOSTS = ['127.0.0.1', 'localhost', 'frontend']

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'rest_framework',  # 追加
    'account.apps.AccountConfig',  # 追加
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

ROOT_URLCONF = 'project.urls'

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

WSGI_APPLICATION = 'project.wsgi.application'

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}

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

# 変更
LANGUAGE_CODE = 'ja'

TIME_ZONE = 'Asia/Tokyo'

USE_I18N = True

USE_TZ = True

STATIC_URL = 'static/'
# 追加
STATIC_ROOT = BASE_DIR / 'static_root'

# 追加
MEDIA_URL = '/media/'
MEDIA_ROOT = BASE_DIR / 'media'

# 追加
EMAIL_BACKEND = 'django.core.mail.backends.console.EmailBackend'

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

# 追加
AUTH_USER_MODEL = 'account.User'

# REST_FRAMEWORK関連の設定
INSTALLED_APPS += ['corsheaders']
MIDDLEWARE = ['corsheaders.middleware.CorsMiddleware'] + MIDDLEWARE

REST_FRAMEWORK = {
    # Enable Session Authentication for App
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'rest_framework.authentication.SessionAuthentication',
    ],
    # Enable IsAuthenticated Permission
    'DEFAULT_PERMISSION_CLASSES': (
        'rest_framework.permissions.IsAuthenticated',
    ),
    # Disable Browsable API and Render JSON
    'DEFAULT_RENDERER_CLASSES': ('rest_framework.renderers.JSONRenderer',),
}

CORS_ORIGIN_WHITELIST = (
    'http://127.0.0.1:3000',
    'http://localhost:3000',
)
CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
]

# When you using credential include in the frontend must include below line
CORS_ALLOW_CREDENTIALS = True

# Sessionid Expire default is 1209600 sec = 14 days
SESSION_COOKIE_AGE = 1800  # 30 Min
# default is 31449600 seconds = 1 year approx
CSRF_COOKIE_AGE = 60 * 60 * 24 * 14  # 14 days

# It will resolve error Forbidden (Origin checking failed - http://127.0.0.1:3000 does not match any trusted origins.)
CSRF_TRUSTED_ORIGINS = ['http://127.0.0.1', 'http://localhost:3000']

CSRF_USE_SESSIONS = False
CSRF_COOKIE_SECURE = True  # For Production set True
SESSION_COOKIE_SECURE = True  # For Production set True

SITE_DOMAIN = "http://localhost:3000"
SITE_NAME = "Local Host"
