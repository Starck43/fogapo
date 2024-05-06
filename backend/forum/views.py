import datetime

from django.forms.models import model_to_dict
from django.http import JsonResponse
from django.template.loader import render_to_string
from django.utils import timezone
from rest_framework import permissions
from rest_framework import viewsets, generics  # , filters
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response

from .logic import send_email_async, get_visitor_reg_num, get_admin_site_url, get_site_url
from .serializers import *


class PostView(viewsets.ModelViewSet):
    queryset = Forum.objects.all()
    serializer_class = PostSerializer
    lookup_field = 'pk'

    def retrieve(self, request, *args, **kwargs):
        request.session['django_timezone'] = str(timezone.utc)
        self.serializer_class = PostDetailSerializer
        return super().retrieve(request, *args, **kwargs)


class PostGroupedView(viewsets.ModelViewSet):
    queryset = Forum.objects.all()

    # serializer_class = PostSerializer
    def list(self, request, *args, **kwargs):
        request.session['django_timezone'] = str(timezone.utc)
        today = datetime.now()
        # today = datetime.now(tz=timezone.utc)
        queryset = self.queryset.filter(date_forum__lt=today).order_by('-date_forum')
        prev_forums = PostSerializer(queryset, many=True, context={'request': request}).data

        queryset = self.queryset.filter(date_forum__gte=today).order_by('date_forum')
        next_forums = PostSerializer(queryset, many=True, context={'request': request}).data

        data = {'prev_forums': prev_forums, 'next_forums': next_forums}
        return Response(data)


class PostLatestView(generics.RetrieveAPIView):
    serializer_class = PostDetailSerializer
    queryset = Forum.objects.filter(general_status=True)

    def get_object(self):
        return self.queryset.first()


# @method_decorator(csrf_exempt, name='dispatch')
# @csrf_exempt
@api_view(["POST", "GET"])
@permission_classes((permissions.AllowAny,))
def new_visitor(request):
    request.session['django_timezone'] = str(timezone.utc)

    data = request.data.copy()
    forum_id = data.pop('id')
    try:
        forum = Forum.objects.get(id=forum_id)

        try:
            visitor = Visitor.objects.get(email=data.get('email'), forum=forum)
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
                data['site'] = get_site_url(request)
                data['server_site'] = get_admin_site_url(request)
                data['info'] = forum.info

                # Отправка уведомления администратору сервиса
                template = render_to_string('admin_email_information.html', data)
                send_email_async('Уведомление о регистрации участника на сайте %s!' % (data['site']['name']), template)

                # Отправка уведомления участнику
                template = render_to_string('user_email_information.html', data)
                send_email_async('Уведомление о регистрации на мероприятие', template, [data.get('email')])
        else:
            data = {'status': -1}

    except Forum.DoesNotExist:
        data = {'status': -1}

    # print(data)
    return JsonResponse(data, safe=False)
