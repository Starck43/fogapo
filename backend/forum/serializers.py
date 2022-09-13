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
		value = value.replace('\r\n', '<br/>')
		return value


class FixRichCaretSerializer(serializers.Field):
	def to_representation(self, value):
		value = value.replace('</p>\r\n\r\n<p>', '<br/>')
		request = self.context.get('request')
		pattern = 'src=\"<URL>/media/'
		value = addDomainToUrl(request, value, pattern)
		return value



class VisitorSerializer(serializers.ModelSerializer):
	class Meta:
		model = Visitor
		fields = '__all__'



class PartnerSerializer(serializers.ModelSerializer):
	class Meta:
		model = Partner
		fields = ( 'id', 'name', 'logo', 'link', )



class HostSerializer(serializers.ModelSerializer):
	avatar = serializers.ImageField(max_length=None, use_url=True)

	class Meta:
		model = Host
		fields = ( 'id', 'name', 'avatar', 'pre_name', 'excerpt', )



class EventSerializer(serializers.ModelSerializer):
	host = HostSerializer(many=False)
	content = FixRichCaretSerializer()

	class Meta:
		model = Event
		fields = ( 'id', 'title', 'content', 'host', 'event_time', )



class ReviewSerializer(serializers.ModelSerializer):
	content = FixRichCaretSerializer()
	visitor = VisitorSerializer(many=False)
	class Meta:
		model = Review
		fields = ( 'id', 'content', 'visitor', )



class PostSerializer(serializers.ModelSerializer):
	events = EventSerializer(source='event', many=True)
	class Meta:
		model = Forum
		fields = ( 'id', 'date_forum', 'title', 'subtitle', 'events',)



class PostDetailSerializer(serializers.ModelSerializer):
	# adding custom fields
	#title = serializers.CharField(write_only=True)
	content = FixAbsolutePathSerializer()
	events = EventSerializer(source='event', many=True)
	partners = PartnerSerializer(many=True)
	reviews = ReviewSerializer(source='review', many=True)
	subtitle = FixCharCaretSerializer()
	location = FixCharCaretSerializer()
	info = FixRichCaretSerializer()
	logo = serializers.ImageField(max_length=None, use_url=True)
	page_background = serializers.ImageField(max_length=None, use_url=True)

	class Meta:
		model = Forum
		fields = '__all__' #('id', 'page_background', 'logo', 'link', 'content', 'title', 'subtitle', 'date_forum', 'events', 'partners', 'reviews', 'location', 'info', 'reg_is_active', 'reg_form', 'cost', 'description', 'keywords')


