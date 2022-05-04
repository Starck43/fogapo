from django.contrib import admin
from django.urls import path, re_path, include
from django.views.generic.base import RedirectView

from django.conf import settings
from django.conf.urls.static import static
from django.views.generic.base import TemplateView
from . import views

urlpatterns = [
	path('', RedirectView.as_view(url='/admin')),
    path('admin/', admin.site.urls),
	path('api/', include('forum.urls')),
	re_path(r'^ckeditor/', include('ckeditor_uploader.urls')),
	path('robots.txt', TemplateView.as_view(template_name="robots.txt", content_type='text/plain')),
	path('generate_new_pages/', views.generate_pages),
]


if settings.DEBUG:
	urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
	import debug_toolbar
	urlpatterns = [
		path('__debug__/', include(debug_toolbar.urls)),
	] + urlpatterns
