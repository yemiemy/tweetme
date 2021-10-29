from django.db import models
from django.conf import settings
from random import randint
import humanize

User = settings.AUTH_USER_MODEL
# Create your models here.

class Tweet(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    content = models.TextField(blank=True, null=True, max_length=240)
    image = models.ImageField(upload_to='tweets/images', blank=True, null=True)
    date_stamp = models.DateTimeField(auto_now_add=True)


    class Meta:
        ordering = ['-id']

    def serialize(self):
        return {
            "id":self.id, 
            "content":self.content, 
            "likes":randint(1,100), 
            "date_stamp":humanize.naturalday(self.date_stamp)
        }