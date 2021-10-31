from django.contrib import admin
from django.urls import path, include
from tweets.views import home
from django.views.generic import TemplateView

from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', home, name='home'),
    path('react/', TemplateView.as_view(template_name='react.html')),
    path('api/tweets/', include('tweets.urls'))
]


if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)