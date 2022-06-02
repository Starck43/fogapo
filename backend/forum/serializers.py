# serializers.py
from django.conf import settings
from rest_framework import serializers
from rest_framework.pagination import PageNumberPagination

# from django.contrib.auth.models import User
from django.http import HttpRequest

from .logic import addDomainToUrl
from .models import *


class FixAbsolutePathSerializer(serializers.Field):
	def to_representation(self, value):
		request = self.context.get('request')
		pattern = 'src=\"<URL>/media/'
		url = addDomainToUrl(request, value, pattern)
		return url


class FixCharCaretSerializer(serializers.Field):
	def to_representation(self, value):
		text = value.replace('\r\n', '<br/>')
		return text


class FixRichCaretSerializer(serializers.Field):
	def to_representation(self, value):
		text = value.replace('</p>\r\n\r\n<p>', '<br/>')
		return text



class PartnerSerializer(serializers.ModelSerializer):
	class Meta:
		model = Partner
		fields = ( 'id', 'name', 'logo', 'link', )


class EventSerializer(serializers.ModelSerializer):
	content = FixAbsolutePathSerializer()
	class Meta:
		model = Event
		fields = ( 'id', 'title', 'content', 'event_time', )



class PostSerializer(serializers.ModelSerializer):
	class Meta:
		model = Forum
		fields = ( 'id', 'date_forum', 'title', )



class PostDetailSerializer(serializers.ModelSerializer):
	# adding custom fields
	#title = serializers.CharField(write_only=True)
	content = FixAbsolutePathSerializer()
	events = EventSerializer(source='event', many=True)
	partners = PartnerSerializer(many=True)
	logo = serializers.ImageField(max_length=None, use_url=True)
	page_background = serializers.ImageField(max_length=None, use_url=True)
	subtitle = FixCharCaretSerializer()
	location = FixCharCaretSerializer()
	info = FixRichCaretSerializer()

	class Meta:
		model = Forum
		fields = ('id', 'page_background', 'logo', 'link', 'content', 'title', 'subtitle', 'date_forum', 'events', 'partners', 'location', 'info', 'reg_is_active', 'cost', 'description', 'keywords')


class VisitorSerializer(serializers.ModelSerializer):

	class Meta:
		model = Visitor
		fields = '__all__'

"""
	def to_representation(self, instance):
		data = super().to_representation(instance)
		data['logo'] = instance.logo.url if logo else None
		data['page_background'] = instance.page_background.url if page_background else None

		return data

 """

