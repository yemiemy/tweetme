from django.db import models
from random import randint
import humanize
# Create your models here.

class Tweet(models.Model):
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