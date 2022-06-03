from django.urls import path, re_path, include
from . import views

app_name = 'forum'

urlpatterns = [
	path('posts/', views.PostView.as_view({'get': 'list'})),
	path('posts/latest/', views.PostLatestView.as_view()),
	path('posts/grouped/', views.PostGroupedView.as_view({'get': 'list'})),
	path('posts/<int:pk>/', views.PostView.as_view({'get': 'retrieve'})),
	path('user/add', views.new_visitor),
]
