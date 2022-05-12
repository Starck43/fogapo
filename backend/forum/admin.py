from django.contrib import admin
from django.template.loader	import render_to_string

from .models import *
from .logic import SendEmail, SendEmailAsync, get_visitor_reg_num, get_site_url


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



class EventInlineAdmin(admin.TabularInline):
	model = Event
	extra = 1 #new blank record count
	show_change_link = True
	fields = ('title', 'event_time', 'sort',)
	list_display = ('title', 'event_time', 'sort',)


class PartnerInlineAdmin(admin.TabularInline):
	model = Partner
	extra = 1 #new blank record count
	show_change_link = True


@admin.register(Forum)
class ForumAdmin(admin.ModelAdmin):
	list_display = ('thumb', 'title', 'date_forum',)
	list_display_links = ('thumb', 'title',)
	list_filter = ('date_forum',)
	inlines = [EventInlineAdmin, PartnerInlineAdmin]


@admin.register(Event)
class EventAdmin(admin.ModelAdmin):
	#fields = ('title', 'content','event_time',)
	list_display = ('__str__', 'forum', 'event_time',)
	list_filter = ('forum','forum__date_forum',)


@admin.register(Partner)
class PartnerAdmin(admin.ModelAdmin):
	list_display = ('thumb', 'name', 'forum', 'link',)
	list_display_links = ('thumb', 'name',)


@admin.register(Visitor)
class VisitorAdmin(admin.ModelAdmin):
	list_display = ('forum', 'name', 'organization', 'occupation', 'status', 'reg_id')
	list_display_links = ('forum', 'name',)
	list_filter = ('name', 'forum', 'occupation', 'status', )

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
				'logo' : {'url': obj.forum.logo.url, 'title': obj.forum.title},
				'reg_id': get_visitor_reg_num(obj),
				'site' : get_site_url(request),
			}

			print('Статус заявки подтвержден', data['reg_id'])
			print(data['site'], data['logo'])

			template = render_to_string('reg_email_confirmation.html', data)
			SendEmailAsync('Регистрация на форум подтверждена', template, [obj.email])

