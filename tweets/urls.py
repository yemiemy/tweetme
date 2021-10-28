from django.urls import path
from .views import home, tweet_list_view, tweet_detail_view, tweet_create_view

urlpatterns = [
    path('', home, name='home'),
    path('tweets', tweet_list_view, name="tweets"),
    path('tweets/<int:tweet_id>/', tweet_detail_view),
    path('create/tweet/', tweet_create_view, name="create_tweet"),
]