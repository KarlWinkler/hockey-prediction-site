from .settings import *

DEBUG = False
ALLOWED_HOSTS = ['karlwinkler.pythonanywhere.com']
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'karlwinkler$hockey-predictions',
        'USER': 'karlwinkler',
        'PASSWORD': 'hockeypickerdb',
        'HOST': 'karlwinkler.mysql.pythonanywhere-services.com',
        'PORT': '3306',
        'OPTIONS': {
            'init_command': "SET sql_mode='STRICT_TRANS_TABLES'"
        }
    }
}