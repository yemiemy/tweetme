from django.urls import path
from .views import home, tweet_list_view, tweet_detail_view
urlpatterns = [
    path('', home),
    path('tweets', tweet_list_view),
    path('tweets/<int:tweet_id>/', tweet_detail_view)
]