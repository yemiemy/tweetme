from django.shortcuts import redirect, render
from django.http import JsonResponse
from django.utils.http import is_safe_url
from django.conf import settings
import humanize
from random import randint

# from tweetme.settings import ALLOWED_HOSTS


from .models import Tweet
from .forms import TweetForm

ALLOWED_HOSTS = settings.ALLOWED_HOSTS

# Create your views here.

def home(request, *args, **kargs):
    return render(request, 'pages/home.html')

def tweet_list_view(request, *args, **kwargs):
    """
    REST API VIEW
    Consume by JavaScript or Swift/Java/iOS/Android 
    """
    qs = Tweet.objects.order_by('-id')
    tweets_list = [
        {
            "id":x.id, 
            "content":x.content, 
            "likes":randint(1,100), 
            "date_stamp":humanize.naturalday(x.date_stamp)
            } for x in qs]

    data = {
        "isUser":False,
        "response": tweets_list
    }
    return JsonResponse(data)

def tweet_create_view(request, *args, **kwargs):
    form = TweetForm(request.POST or None)
    next_url = request.POST.get("next") or None
    if form.is_valid():
        obj = form.save(commit=False)
        # Do other form related logic
        obj.save()
        if request.is_ajax():
            return JsonResponse({}, status=201)
        if next_url != None and is_safe_url(next_url, ALLOWED_HOSTS):
            return redirect("home")
        form = TweetForm()
    return render(request, 'components/form.html', {'form':form})

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