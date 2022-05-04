from django.contrib import admin

from .models import *

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



