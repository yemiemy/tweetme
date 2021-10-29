from django.db import models
from django.conf import settings
from random import randint
import humanize

User = settings.AUTH_USER_MODEL
# Create your models here.

class TweetLike(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    tweet = models.ForeignKey("Tweet", on_delete=models.CASCADE)
    timestamp = models.TimeField(auto_now_add=True)

class Tweet(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    content = models.TextField(blank=True, null=True, max_length=240)
    image = models.ImageField(upload_to='tweets/images', blank=True, null=True)
    likes = models.ManyToManyField(User, related_name="tweet_user", blank=True, through=TweetLike)
    timestamp = models.DateTimeField(auto_now_add=True)


    class Meta: 
        ordering = ['-id']

    def serialize(self):
        return {
            "id":self.id, 
            "content":self.content, 
            "likes":randint(1,100), 
            "timestamp":humanize.naturalday(self.timestamp)
        }