from __future__ import absolute_import

from django.template.loader	import render_to_string

from crm.celery import app
from .models import Visitor
from .logic import send_email


@app.task(default_retry_delay=10 * 60)
def send_email_task(context, visitor_id):
	visitor = Visitor.objects.get(id=visitor_id)
	try:
		context['guest'] = visitor.name
		ricipient = visitor.email
		print(f'Sending email to {ricipient}')
		subject = "Приглашение на мероприятие"
		template = render_to_string('invitation_email.html', context)
		return send_email(subject, template, [ricipient])

	except Visitor.DoesNotExist:
		print(f'no visitor with id {visitor_id}!')
		return False
