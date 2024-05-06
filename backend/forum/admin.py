from django.contrib import admin
from django.template.loader import render_to_string

import datetime

from .models import *
from .tasks import send_approved_reg_email, send_invitation_email
from .logic import get_visitor_reg_num


# Creating a model's sort function for admin
def get_app_list(self, request):
    ordered_models = [
        ('projects', [
            'Forum',
            'Event',
            'Host',
            'Partner',
            'Visitor',
            'Invitation',
            'Review',
        ])
    ]
    app_dict = self._build_app_dict(request)

    for app_name, object_list in ordered_models:
        app = app_dict.get(app_name, None)
        if app:
            app['models'].sort(key=lambda x: object_list.index(x['object_name']))
    # yield app

    return sorted(app_dict.values(), key=lambda x: x['name'].lower())


admin.AdminSite.get_app_list = get_app_list


class EventInlineAdmin(admin.StackedInline):
    model = Event
    extra = 0  # new blank record count
    show_change_link = True
    fields = ('host', 'title', 'event_time', 'content', 'sort',)


# list_display = ('content', 'sort',)


class ReviewInlineAdmin(admin.StackedInline):
    model = Review
    extra = 0  # new blank record count
    show_change_link = True
    fields = ('forum', 'visitor', 'author', 'content',)


@admin.register(Forum)
class ForumAdmin(admin.ModelAdmin):
    # exclude=('slug',)
    list_display = ('title', 'date_forum', 'general_status')
    list_display_links = ('title',)
    list_filter = ('date_forum',)
    inlines = [EventInlineAdmin]


@admin.register(Host)
class HostAdmin(admin.ModelAdmin):
    list_display = ('thumb', 'name',)
    list_display_links = ('thumb', 'name',)


@admin.register(Event)
class EventAdmin(admin.ModelAdmin):
    # fields = ('title', 'content','event_time',)
    list_display = ('__str__', 'host', 'forum',)
    list_filter = ('forum__date_forum',)
    search_fields = ('forum__title', 'title', 'content')


@admin.register(Partner)
class PartnerAdmin(admin.ModelAdmin):
    list_display = ('thumb', 'name', 'link',)
    list_display_links = ('thumb', 'name',)


@admin.register(Visitor)
class VisitorAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'status', 'reg_id', 'forum',)
    list_display_links = ('name',)
    search_fields = ('name', 'email', 'forum__title',)
    list_filter = ('forum', 'occupation', 'status',)
    date_hierarchy = 'forum__date_forum'
    ordering = ('-id',)
    inlines = [ReviewInlineAdmin]

    def reg_id(self, obj):
        return get_visitor_reg_num(obj)

    reg_id.short_description = 'Рег №'

    def save_model(self, request, obj, form, change):
        super().save_model(request, obj, form, change)

        if change and obj.status == 2:
            send_approved_reg_email(request, obj)


@admin.register(Invitation)
class InvitationAdmin(admin.ModelAdmin):
    readonly_fields = ('status', 'last_sent_date',)
    list_display = ('forum', 'status', 'last_sent_date',)

    def save_model(self, request, obj, form, change):
        old_list = obj.visitors.values_list('name', 'email') if change else []
        new_list = form.cleaned_data['visitors'].values_list('name', 'email')
        visitors_list = list(set(new_list).difference(old_list))
        print(visitors_list)
        if len(visitors_list) > 0:
            obj.status = True
            obj.last_sent_date = datetime.datetime.now()
        super().save_model(request, obj, form, change)

        # async invitation email send
        send_invitation_email(request, obj, visitors_list)

    def formfield_for_manytomany(self, db_field, request, **kwargs):
        if db_field.name == "visitors":
            unique_emails = list(
                {v['email']: v['id'] for v in Visitor.objects.order_by('name').values('id', 'email')}.values())
            kwargs["queryset"] = Visitor.objects.filter(pk__in=unique_emails)
        return super().formfield_for_manytomany(db_field, request, **kwargs)


@admin.register(Review)
class ReviewAdmin(admin.ModelAdmin):
    list_display = ('visitor', 'author', 'forum_list',)
    list_display_links = ('visitor', 'author',)
    search_fields = ('content', 'author', 'visitor__name', 'forum__title',)
    list_filter = ('forum', 'visitor',)

    def forum_list(self, obj):
        return ', '.join(obj.forum.all().distinct().values_list('title', flat=True))

    forum_list.short_description = 'Форумы'
