from django.urls import path
from .views import (
    tweet_list_view, 
    tweet_detail_view, tweet_create_view,
    tweet_delete_view, tweet_action_view
    )

urlpatterns = [
    path('tweets', tweet_list_view, name="tweets"),
    path('tweets/<int:tweet_id>/', tweet_detail_view),
    path('create/tweet/', tweet_create_view, name="create_tweet"),
    path('tweets/<int:tweet_id>/delete/', tweet_delete_view),
    path('tweets/action/', tweet_action_view, name="tweet_action"),
]