from django.apps import AppConfig


class ExtendedConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'extended'
