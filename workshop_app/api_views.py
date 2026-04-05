from django.contrib.auth import login, logout, authenticate
from django.middleware.csrf import get_token
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response

from .models import Profile, User, Workshop, WorkshopType, states
from .serializers import (
    UserSerializer, WorkshopSerializer, WorkshopTypeSerializer
)


def is_instructor(user):
    return user.groups.filter(name='instructor').exists()


@api_view(['GET'])
@permission_classes([AllowAny])
def get_csrf_token(request):
    """Return CSRF token for the frontend"""
    token = get_token(request)
    return Response({'csrfToken': token})


@api_view(['POST'])
@permission_classes([AllowAny])
def api_login(request):
    """Login API endpoint"""
    username = request.data.get('username', '')
    password = request.data.get('password', '')

    if not username or not password:
        return Response(
            {'error': 'Username and password are required'},
            status=status.HTTP_400_BAD_REQUEST
        )

    user = authenticate(username=username, password=password)
    if user is None:
        return Response(
            {'error': 'Invalid username or password'},
            status=status.HTTP_401_UNAUTHORIZED
        )

    if not hasattr(user, 'profile') or not user.profile.is_email_verified:
        return Response(
            {'error': 'Email not verified', 'activation_required': True},
            status=status.HTTP_403_FORBIDDEN
        )

    login(request, user)
    serializer = UserSerializer(user)
    return Response({
        'user': serializer.data,
        'is_instructor': is_instructor(user)
    })


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def api_logout(request):
    """Logout API endpoint"""
    logout(request)
    return Response({'message': 'Logged out successfully'})


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def api_current_user(request):
    """Get current logged-in user info"""
    user = request.user
    serializer = UserSerializer(user)
    return Response({
        'user': serializer.data,
        'is_instructor': is_instructor(user)
    })


@api_view(['GET'])
@permission_classes([AllowAny])
def api_workshop_types(request):
    """Get all workshop types for filter dropdowns"""
    types = WorkshopType.objects.all().order_by('id')
    serializer = WorkshopTypeSerializer(types, many=True)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([AllowAny])
def api_states(request):
    """Get all Indian states for filter dropdowns"""
    state_list = [{'code': code, 'name': name} for code, name in states if code]
    return Response(state_list)
