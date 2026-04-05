from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Profile, Workshop, WorkshopType, Comment, AttachmentFile, states


class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ['title', 'institute', 'department', 'phone_number',
                  'position', 'location', 'state', 'is_email_verified']


class UserSerializer(serializers.ModelSerializer):
    profile = ProfileSerializer(read_only=True)

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name', 'profile']


class WorkshopTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = WorkshopType
        fields = '__all__'


class WorkshopSerializer(serializers.ModelSerializer):
    coordinator_name = serializers.SerializerMethodField()
    instructor_name = serializers.SerializerMethodField()
    workshop_type_name = serializers.SerializerMethodField()
    status_display = serializers.SerializerMethodField()
    coordinator_institute = serializers.SerializerMethodField()
    coordinator_id = serializers.IntegerField(source='coordinator.id', read_only=True)

    class Meta:
        model = Workshop
        fields = ['id', 'uid', 'date', 'status', 'status_display',
                  'tnc_accepted', 'coordinator_name', 'instructor_name',
                  'workshop_type_name', 'coordinator_institute',
                  'coordinator_id', 'workshop_type']

    def get_coordinator_name(self, obj):
        return obj.coordinator.get_full_name()

    def get_instructor_name(self, obj):
        if obj.instructor:
            return obj.instructor.get_full_name()
        return None

    def get_workshop_type_name(self, obj):
        return obj.workshop_type.name

    def get_status_display(self, obj):
        return obj.get_status()

    def get_coordinator_institute(self, obj):
        if hasattr(obj.coordinator, 'profile'):
            return obj.coordinator.profile.institute
        return ''


class CommentSerializer(serializers.ModelSerializer):
    author_name = serializers.SerializerMethodField()

    class Meta:
        model = Comment
        fields = ['id', 'author', 'author_name', 'comment', 'public',
                  'created_date', 'workshop']

    def get_author_name(self, obj):
        return obj.author.get_full_name()


class StatesSerializer(serializers.Serializer):
    """Helper to return states choices"""
    code = serializers.CharField()
    name = serializers.CharField()
