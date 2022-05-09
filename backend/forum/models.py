from django.db import models
from django.db.models import Q, F
from django.db.models.functions import Coalesce

import os
import datetime

from uuslug import uuslug
from ckeditor_uploader.fields import RichTextUploadingField
from ckeditor.fields import RichTextField
from imagekit.models import ProcessedImageField
from imagekit.processors import ResizeToFit, ResizeToFill

from .logic import remove_images, get_admin_thumb, ForumUploadTo, MediaFileStorage


class Forum(models.Model):
	logo = ProcessedImageField(
		upload_to=ForumUploadTo,
		processors=[ResizeToFit(150, 150)],
		format='PNG',
		options={'quality': 80},
		storage=MediaFileStorage(output='logo.png'),
		verbose_name='Логотип',
		help_text=''
	)
	title = models.CharField('Название форума', max_length=250, help_text='Заголовок форума')
	subtitle = RichTextField('Подзаголовок', blank=True, help_text='Форматированный текст под заголовком')
	description = models.TextField('Краткое описание мероприятия', blank=True, help_text='Текст попадает в мета описание сайта для поисковиков. 80-100 символов')
	keywords = models.CharField('Ключевые слова', max_length=250, blank=True, help_text='Главные поисковые словосочетания. Перечисление через запятую')
	slug = models.SlugField('Ярлык', max_length=30, unique=True, help_text='Для использования в качестве ссылки для перехода')
	date_forum = models.DateTimeField('Дата события')
	location = models.TextField('Место проведения', blank=True, help_text='')
	info = RichTextField('Дополнительная информация', blank=True, help_text='Форматированный блок, расположенный под местом проведения')
	page_background = models.FileField(upload_to=ForumUploadTo, storage=MediaFileStorage(), blank=True, verbose_name='Фоновая подложка', help_text='Фото на нижнем слое фона страницы')

	class Meta:
		verbose_name = 'Форум'
		verbose_name_plural = 'Список форумов'
		ordering = ['-date_forum']
		get_latest_by = ['-date_forum']
		db_table = 'forums'


	def __str__(self):
		return self.title

	def thumb(self):
		return get_admin_thumb(self.logo)
	thumb.short_description = 'Логотип'

	def save(self, *args, **kwargs):
		if not self.slug:
			self.slug = uuslug(self.title.lower(), instance=self)
		super().save(*args, **kwargs)

	def delete(self, *args, **kwargs):
		super().delete(*args, **kwargs)
		remove_images(self.logo)
		remove_images(self.page_background)



class Event(models.Model):
	forum = models.ForeignKey(Forum, on_delete=models.SET_NULL, null=True, related_name='event', verbose_name = 'Форум', help_text='')
	title = models.CharField('Название события', max_length=250, null=True, blank=True, help_text='Титульный заголовок у события')
	content = RichTextUploadingField('Контент', null=True, blank=True, help_text='Форматтированный текст с фото в блоке событий')
	event_time = models.TimeField('Время', null=True, blank=True, help_text='Укажите при необходимости время проведения события')
	sort = models.PositiveSmallIntegerField('Индекс сортировки', null=True, blank=True)

	class Meta:
		verbose_name = 'Событие'
		verbose_name_plural = 'Список событий'
		ordering = ['-forum__date_forum', Coalesce("sort", F('id') + 100)]
		db_table = 'events'


	def __str__(self):
		return self.title if self.title else 'Событие '+self.forum.date_forum.strftime('%Y')



class Partner(models.Model):
	forum = models.ForeignKey(Forum, on_delete=models.SET_NULL, null=True, related_name='partner', verbose_name = 'Форум', help_text='')
	name = models.CharField('Имя партнера', max_length=150, help_text='')
	logo = ProcessedImageField(
		upload_to=ForumUploadTo,
		processors=[ResizeToFit(300, 100)],
		format='PNG',
		options={'quality': 80},
		storage=MediaFileStorage(),
		verbose_name='Логотип',
		help_text='Логотип в формате png'
	)
	link = models.URLField('Сайт', blank=True, help_text='Ссылка на сайт партнера')
	sort = models.PositiveSmallIntegerField('Индекс сортировки', null=True, blank=True)

	class Meta:
		verbose_name = 'Партнер'
		verbose_name_plural = 'Список партнеров'
		ordering = ['-forum__date_forum', Coalesce("sort", F('id') + 100)]
		db_table = 'partners'

	def __str__(self):
		return self.name

	def thumb(self):
		return get_admin_thumb(self.logo)
	thumb.short_description = 'Логотип'

	def delete(self, *args, **kwargs):
		super().delete(*args, **kwargs)
		remove_images(self.logo)



class Visitor(models.Model):
	CHOICES = ((1,'не подтвержден'),(2,'подтвержден'),)

	forum = models.ForeignKey(Forum, on_delete=models.CASCADE, related_name='visitor', verbose_name = 'Форум', help_text='')
	user_name = models.CharField('Имя посетителя', max_length=100, null=True, help_text='')
	organisation = models.CharField('Место работы', max_length=250, blank=True, help_text='')
	occupation = models.CharField('Род деятельности', max_length=250, blank=True, help_text='')
	phone = models.CharField('Контактный телефон',  max_length=18, null=True)
	email = models.EmailField('E-mail', max_length=75, null=True)
	questionnaire = models.TextField('Анкета', blank=True)
	status = models.PositiveIntegerField('Статус участника', choices=CHOICES, default=1, help_text='')

	class Meta:
		verbose_name = 'Заявка на регистрацию'
		verbose_name_plural = 'Список посетителей'
		ordering = ['-forum__date_forum']
		db_table = 'visitors'

	def __str__(self):
		return self.user_name
