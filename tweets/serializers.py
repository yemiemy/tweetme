from rest_framework import serializers
from .models import Tweet
from django.conf import settings
import humanize

MAX_TWEET_LENGTH = settings.MAX_TWEET_LENGTH
TWEET_ACTION_OPTIONS = ["like", "unlike", "retweet"]


class TweetActionSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    action = serializers.CharField()
    content = serializers.CharField(allow_blank=True, required=False)

    def validate_content(self, value):
        value = value.lower().strip()
        if not value in TWEET_ACTION_OPTIONS:
            raise serializers.ValidationError("This is not a valid action for tweet.")
        return value

class TweetCreateSerializer(serializers.ModelSerializer):
    likes = serializers.SerializerMethodField(read_only=True)
    timestamp = serializers.SerializerMethodField(read_only=True)
    class Meta:
        model = Tweet
        fields = [
            'id',
            'likes',
            'content',
            'timestamp',
            'is_retweet'
        ]

    def get_likes(self, obj):
        return obj.likes.count()

    def get_timestamp(self, obj):
        return humanize.naturalday(obj.timestamp)

    def validate_content(self, value):
        if len(value) > MAX_TWEET_LENGTH:
            raise serializers.ValidationError("Tweet is too long.")
        return value

class TweetSerializer(serializers.ModelSerializer):
    likes = serializers.SerializerMethodField(read_only=True)
    content = serializers.SerializerMethodField(read_only=True)
    timestamp = serializers.SerializerMethodField(read_only=True)
    parent = TweetCreateSerializer(read_only=True)
    class Meta:
        model = Tweet
        fields = [
            'id',
            'likes',
            'content',
            'timestamp',
            'is_retweet',
            'parent'
        ]

    def get_likes(self, obj):
        return obj.likes.count()
    
    def get_content(self, obj):
        content = obj.content
        if obj.is_retweet:
            content = obj.parent.content
        return content

    def get_timestamp(self, obj):
        return humanize.naturalday(obj.timestamp)