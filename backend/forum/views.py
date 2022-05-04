from urllib import parse
from django.conf import settings
from django.db.models import Q, F

from django.shortcuts import render, redirect
from django.http import JsonResponse
from rest_framework.response import Response
from rest_framework import views, viewsets, generics, permissions #, filters
from rest_framework.decorators import api_view, permission_classes, action
# from django.contrib.auth.models import User

from .models import *
from .serializers import *


class PostView(viewsets.ModelViewSet):
	queryset = Forum.objects.all()
	serializer_class = PostSerializer
	lookup_field = 'slug'
	def retrieve(self, request, *args, **kwargs):
		self.serializer_class = PostDetailSerializer
		return super().retrieve(request, *args, **kwargs)


class PostLatestView(generics.RetrieveAPIView):
	serializer_class = PostDetailSerializer
	queryset = Forum.objects.all()
	def get_object(self):
		queryset = self.get_queryset()
		return queryset.latest()


