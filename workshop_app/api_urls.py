from django.urls import path
from . import api_views

urlpatterns = [
    path('csrf/', api_views.get_csrf_token, name='api_csrf'),
    path('login/', api_views.api_login, name='api_login'),
    path('logout/', api_views.api_logout, name='api_logout'),
    path('user/', api_views.api_current_user, name='api_current_user'),
    path('workshop-types/', api_views.api_workshop_types, name='api_workshop_types'),
    path('states/', api_views.api_states, name='api_states'),
]
