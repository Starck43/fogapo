from __future__ import absolute_import

from django.template.loader	import render_to_string

from crm.celery import app
from .models import Visitor
from .logic import send_email_async, get_admin_site_url, get_site_url, get_visitor_reg_num


#@app.task(default_retry_delay=10 * 60)
def send_invitation_email(request, invitation, visitors_list):
	context = {
		'site_name': get_site_url(request)['name'],
		'site_url': get_admin_site_url(request),
		'forum': invitation.forum.title,
		'location': invitation.forum.location,
		'date_forum': invitation.forum.date_forum.strftime('%d/%m/%Y в %H:%M'),
		'content': invitation.content,
	}

	for visitor in visitors_list:
		context['guest'] = visitor[0]
		ricipient = visitor[1]
		#print(f'Sending email to {ricipient}')
		template = render_to_string('invitation_email.html', context)
		return send_email_async("Приглашение на мероприятие", template, [ricipient])



def send_approved_reg_email(request, visitor):
	context = {
		'site' : get_site_url(request),
		'site_url': get_admin_site_url(request),
		'name' : visitor.name,
		'forum': visitor.forum,
		'date_forum': visitor.forum.date_forum,
		'location': visitor.forum.location,
		'reg_id': get_visitor_reg_num(visitor),
	}

	#print('Статус заявки подтвержден', context['reg_id'])
	template = render_to_string('reg_email_confirmation.html', context)
	return send_email_async('Регистрация на форум подтверждена', template, [visitor.email])

