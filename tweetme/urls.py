from django.contrib import admin
from django.urls import path, include
from tweets.views import home

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', home, name='home'),
    path('api/tweets/', include('tweets.urls'))
]
