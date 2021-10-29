from django.urls import path
from .views import (
    tweet_list_view, 
    tweet_detail_view, tweet_create_view,
    tweet_delete_view, tweet_action_view
    )

urlpatterns = [
    path('', tweet_list_view, name="tweets"),
    path('action/', tweet_action_view, name="tweet_action"),
    path('create/', tweet_create_view, name="create_tweet"),
    path('<int:tweet_id>/', tweet_detail_view),
    path('<int:tweet_id>/delete/', tweet_delete_view),
]