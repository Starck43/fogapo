from django.contrib import admin
from django.template.loader	import render_to_string

import datetime

from .tasks import send_email_task
from .models import *
from .logic import send_email, send_email_async, get_admin_site_url, get_visitor_reg_num, get_site_url


# Creating a model's sort function for admin
def get_app_list(self, request):
	ordered_models = [
		('projects', [
			'Forum',
			'Event',
			'Partner',
		])
	]
	app_dict = self._build_app_dict(request)

	for app_name, object_list in ordered_models:
		app = app_dict.get(app_name, None)
		if app:
			app['models'].sort(key=lambda x: object_list.index(x['object_name']))
		#yield app

	return sorted(app_dict.values(), key=lambda x: x['name'].lower())

admin.AdminSite.get_app_list = get_app_list



class EventInlineAdmin(admin.StackedInline):
	model = Event
	extra = 0 #new blank record count
	show_change_link = True
	fields = ('title', 'event_time', 'content', 'sort',)
	#list_display = ('content', 'sort',)


@admin.register(Forum)
class ForumAdmin(admin.ModelAdmin):
	#exclude=('slug',)
	list_display = ('title', 'date_forum',)
	list_display_links = ('title',)
	list_filter = ('date_forum',)
	inlines = [EventInlineAdmin]


@admin.register(Event)
class EventAdmin(admin.ModelAdmin):
	#fields = ('title', 'content','event_time',)
	list_display = ('__str__', 'forum', 'event_time',)
	list_filter = ('forum','forum__date_forum',)


@admin.register(Partner)
class PartnerAdmin(admin.ModelAdmin):
	list_display = ('thumb', 'name',  'link',)
	list_display_links = ('thumb', 'name',)


@admin.register(Visitor)
class VisitorAdmin(admin.ModelAdmin):
	list_display = ('forum', 'name', 'email', 'status', 'reg_id')
	list_display_links = ('forum', 'name',)
	search_fields = ('name', 'forum__title', )
	list_filter = ('forum', 'occupation', 'status', )
	date_hierarchy = 'forum__date_forum'


	def reg_id(self, obj):
		return get_visitor_reg_num(obj)
	reg_id.short_description = 'Рег №'

	def save_model(self, request, obj, form, change):
		super().save_model(request, obj, form, change)

		if change and obj.status == 2:

			# Отправка уведомления участнику
			data = {
				'name' : obj.name,
				'forum': obj.forum,
				'date_forum': obj.forum.date_forum,
				'location': obj.forum.location,
				'logo' : {'url': None, 'title': obj.forum.title},
				'reg_id': get_visitor_reg_num(obj),
				'site' : get_site_url(request),
			}

			print('Статус заявки подтвержден', data['reg_id'])
			#print(data['site'], data['logo'])

			template = render_to_string('reg_email_confirmation.html', data)
			send_email_async('Регистрация на форум подтверждена', template, [obj.email])



@admin.register(Invitation)
class InvitationAdmin(admin.ModelAdmin):
	readonly_fields = ('status', 'last_sent_date',)
	list_display = ('forum', 'status', 'last_sent_date',)


	def save_model(self, request, obj, form, change):
		old_list = obj.visitors.values_list('id', flat=True) if change else []
		new_list = form.cleaned_data['visitors'].values_list('id', flat=True)
		added_visitors_ids = list(set(new_list).difference(old_list))
		obj.status = True
		if len(added_visitors_ids) > 0:
			obj.last_sent_date = datetime.datetime.now()
		super().save_model(request, obj, form, change)

		# async email send
		context = {
			'site_name': get_site_url(request)['name'],
			'site_url': get_admin_site_url(request),
			'forum': obj.forum.title,
			'location': obj.forum.location,
			'date_forum': obj.forum.date_forum.strftime('%d/%m/%Y в %H:%M'),
			'content': obj.content
		}

		for visitor_id in added_visitors_ids:
			send_email_task.delay(context, visitor_id)


	def formfield_for_manytomany(self, db_field, request, **kwargs):
		if db_field.name == "visitors":
			unique_emails = list({v['email']:v['id'] for v in Visitor.objects.order_by('name').values('id', 'email')}.values())
			kwargs["queryset"] = Visitor.objects.filter(pk__in=unique_emails)
		return super().formfield_for_manytomany(db_field, request, **kwargs)

