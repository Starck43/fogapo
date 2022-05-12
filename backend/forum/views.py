from urllib import parse
from django.conf import settings

from django.db.models import Q, F
from django.shortcuts import render, redirect
from django.template.loader	import render_to_string
from django.http import JsonResponse, HttpResponse
from django.utils.decorators import method_decorator
from django.forms.models import model_to_dict
from django.views.decorators.csrf import csrf_exempt
from rest_framework.response import Response
from rest_framework import views, viewsets, generics, permissions #, filters
from rest_framework.decorators import api_view, permission_classes
from rest_framework import permissions
from rest_framework.parsers import JSONParser

from .models import *
from .serializers import *

from .logic import SendEmail, SendEmailAsync, get_visitor_reg_num, get_admin_site_url, get_site_url


#@method_decorator(csrf_exempt, name='dispatch')
#@csrf_exempt
@api_view(["POST", "GET"])
@permission_classes((permissions.AllowAny,))
def new_visitor(request):
	data = request.data
	forum = Forum.objects.latest()
	# visitor_serializer = VisitorSerializer(data=data)

	try:
		visitor = Visitor.objects.get(email=data['email'], forum=forum)
		data = model_to_dict(visitor)
		data['status_message'] = 'заявка подтверждена' if visitor.status == 2 else 'ожидание подтверждения'
	except Visitor.DoesNotExist:
		visitor = Visitor.objects.create(forum=forum, **data)
		data = model_to_dict(visitor)
		data['status'] = 0
		data['status_message'] = 'новая регистрация'

	if visitor:
		data['forum'] = forum.title
		data['location'] = forum.location
		data['date'] = forum.date_forum
		data['reg_id'] = get_visitor_reg_num(visitor)

		if data['status'] == 0:
			data['server_site'] = get_admin_site_url(request)
			#print(get_site_url(request))
			# Отправка уведомления администратору сервиса
			template = render_to_string('admin_email_information.html', data)
			SendEmailAsync(f'Уведомление о регистрации участника на сайте {get_site_url(request)}!', template)

			# Отправка уведомления участнику
			template = render_to_string('user_email_information.html', data)
			SendEmailAsync('Уведомление о регистрации на мероприятие', template, [data['email']])
	else:
		data = {}
		data['status'] = -1

	#print(data)

	return JsonResponse(data, safe=False)


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


