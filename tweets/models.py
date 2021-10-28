from django.db import models

# Create your models here.

class Tweet(models.Model):
    content = models.TextField(blank=True, null=True, max_length=240)
    image = models.ImageField(upload_to='tweets/images', blank=True, null=True)
    date_stamp = models.DateTimeField(auto_now_add=True)