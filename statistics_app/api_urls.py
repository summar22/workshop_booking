from django.urls import path
from . import api_views

urlpatterns = [
    path('public/', api_views.api_workshop_public_stats, name='api_public_stats'),
]
