from django.urls import path, re_path, include
from . import views

app_name = 'forum'

urlpatterns = [
	path('posts/', views.PostView.as_view({'get': 'list'})),
	path('post/latest/', views.PostLatestView.as_view()),
	path('posts/<str:slug>/', views.PostView.as_view({'get': 'retrieve'})),
]
