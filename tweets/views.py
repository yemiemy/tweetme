from django.shortcuts import render
from django.http import JsonResponse
from .models import Tweet
from random import randint
# Create your views here.

def home(request, *args, **kargs):
    return render(request, 'pages/home.html')

def tweet_list_view(request, *args, **kwargs):
    """
    REST API VIEW
    Consume by JavaScript or Swift/Java/iOS/Android 
    """
    qs = Tweet.objects.order_by('-id')
    tweets_list = [{"id":x.id, "content":x.content, "likes":randint(1,100)} for x in qs]

    data = {
        "isUser":False,
        "response": tweets_list
    }
    return JsonResponse(data)

def tweet_detail_view(request, tweet_id, *args, **kwargs):
    status = 200
    data = {
        "id":tweet_id
    }
    try:
        obj = Tweet.objects.get(id=tweet_id)
        data["content"] = obj.content
    except:
        data["message"] = "Not found"
        status = 404
    
    return JsonResponse(data, status=status)