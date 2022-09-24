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

#from smart_selects.db_fields import ChainedManyToManyField

from .logic import remove_images, get_admin_thumb, ForumUploadTo, MediaFileStorage



class Partner(models.Model):
	name = models.CharField('Имя партнера', max_length=150, help_text='')
	logo = ProcessedImageField(
		upload_to=ForumUploadTo,
		processors=[ResizeToFit(300, 100)],
		format='PNG',
		options={'quality': 80},
		storage=MediaFileStorage(),
		verbose_name='Логотип',
		help_text='Логотип в формате PNG'
	)
	link = models.URLField('Сайт', blank=True, help_text='Ссылка на сайт партнера')
	sort = models.PositiveSmallIntegerField('Индекс сортировки', null=True, blank=True)

	class Meta:
		verbose_name = 'Партнер'
		verbose_name_plural = 'Список партнеров'
		ordering = [Coalesce("sort", F('id') + 100)]
		db_table = 'partners'

	def __str__(self):
		return self.name

	def thumb(self):
		return get_admin_thumb(self.logo)
	thumb.short_description = 'Логотип'

	def delete(self, *args, **kwargs):
		super().delete(*args, **kwargs)
		remove_images(self.logo)



class Forum(models.Model):
	CHOICES = ((0,'простая форма'),(1,'расширенная форма'),)

	title = models.CharField('Название мероприятия', max_length=250, help_text='')
	subtitle = models.TextField('Подзаголовок', blank=True, help_text='Текст в шапке сайта')
	content = RichTextUploadingField('Контент', null=True, blank=True, help_text='Секция описания мероприятия')
	date_forum = models.DateTimeField('Дата события')
	partners = models.ManyToManyField(Partner, blank=True, related_name='partners', verbose_name = 'Партнеры мероприятия', help_text='')
	location = models.TextField('Место проведения', blank=True, help_text='')
	info = RichTextField('Дополнительная информация', blank=True, help_text='Дополнительный блок, расположенный под местом проведения')
	reg_is_active = models.BooleanField('Отображать блок регистрации до начала мероприятия', null=True, default=True)
	cost = models.BooleanField('Платное участие', null=True, default=False)
	reg_form = models.PositiveSmallIntegerField('Форма регистрации', null=True, choices=CHOICES, default=0, help_text='' )
	logo = ProcessedImageField(
		upload_to=ForumUploadTo,
		storage=MediaFileStorage(output='logo.png'),
		blank=True,
		processors=[ResizeToFit(150, 150)],
		format='PNG',
		options={'quality': 80},
		verbose_name='Дополнительный логотип',
		help_text='Дополнительный логотип в шапке под главным'
	)
	sort = models.PositiveSmallIntegerField('Индекс сортировки', null=True, blank=True)
	page_background = models.FileField(upload_to=ForumUploadTo, storage=MediaFileStorage(), blank=True, verbose_name='Фоновая подложка', help_text='Фото на нижнем слое фона страницы')

	link = models.URLField('Ссылка для логотипа', null=True, blank=True, help_text='')
	description = models.TextField('Краткое описание мероприятия', blank=True, help_text='Текст попадает в мета описание сайта для поисковиков. 80-100 символов')
	keywords = models.CharField('Ключевые слова', max_length=250, blank=True, help_text='Главные поисковые словосочетания. Перечисление через запятую')

	class Meta:
		verbose_name = 'форум'
		verbose_name_plural = 'Форумы'
		ordering = [Coalesce("sort", 100000), '-date_forum']
		get_latest_by = [Coalesce("sort", 100000), '-date_forum']
		db_table = 'forums'

	def __init__(self, *args, **kwargs):
		super().__init__(*args, **kwargs)
		self.original_logo = self.logo
		self.original_page_background = self.page_background

	def __str__(self):
		return self.title


	def save(self, *args, **kwargs):

		# delete an old image before saving a new one
		if self.original_logo and self.logo != self.original_logo:
			remove_images(self.original_logo)
			self.original_logo = None

		# delete an old image before saving a new one
		if self.original_page_background and self.page_background != self.original_page_background:
			remove_images(self.original_page_background)
			self.original_page_background = None

		super().save(*args, **kwargs)
		self.original_logo = self.logo
		self.original_page_background = self.page_background


	def delete(self, *args, **kwargs):
		super().delete(*args, **kwargs)
		remove_images(self.logo)
		remove_images(self.page_background)



class Host(models.Model):
	pre_name = models.CharField('Предзаголовок', max_length=50, null=True, blank=True, default='специальный гость', help_text='Текст перед именем')
	name = models.CharField('Имя лектора', max_length=250)
	excerpt = models.TextField('О лекторе', blank=True, help_text='Краткое описание лектора')
	avatar = ProcessedImageField(
		upload_to='avatar/',
		storage=MediaFileStorage(),
		blank=True,
		processors=[ResizeToFit(320, 320)],
		options={'quality': 80},
		verbose_name='Автатар',
		help_text='Портрет размером 320х320 пикс'
	)
	link = models.URLField('Ссылка на сайт', null=True, blank=True, help_text='Внешняя ссылка на сайт лектора')

	class Meta:
		verbose_name = 'лектор'
		verbose_name_plural = 'Лекторы и спикеры'
		ordering = ['name']
		db_table = 'hosts'

	def __str__(self):
		return self.name

	def thumb(self):
		return get_admin_thumb(self.avatar)
	thumb.short_description = 'Автатар'

	def delete(self, *args, **kwargs):
		super().delete(*args, **kwargs)
		remove_images(self.avatar)



class Event(models.Model):
	forum = models.ForeignKey(Forum, on_delete=models.SET_NULL, null=True, related_name='event', verbose_name = 'Форум', help_text='')
	host = models.ForeignKey(Host, on_delete=models.SET_NULL, null=True, blank=True, related_name='host', verbose_name = 'Ведущий события', help_text='')
	title = models.CharField('Заголовок события', max_length=150, null=True, blank=True, help_text='Можно указать короткое название события')
	content = RichTextUploadingField('Описание события', null=True, blank=True, help_text='')
	event_time = models.TimeField('Время выступления', null=True, blank=True, help_text='')
	sort = models.PositiveSmallIntegerField('Индекс сортировки', null=True, blank=True)

	class Meta:
		verbose_name = 'событие на форуме'
		verbose_name_plural = 'Все события'
		ordering = ['-forum__date_forum', Coalesce("sort", F('id') + 100)]
		db_table = 'events'


	def __str__(self):
		return self.title if self.title else 'Событие от '+self.forum.date_forum.strftime('%d-%m-%y')



class Visitor(models.Model):
	CHOICES = ((0,'не подтвержден'),(1,'ожидание подтверждения'),(2,'подтвержден'),)

	forum = models.ForeignKey(Forum, on_delete=models.SET_NULL, null=True, related_name='visitor', verbose_name = 'Форум', help_text='')
	name = models.CharField('Имя посетителя', max_length=100, null=True, help_text='')
	organization = models.CharField('Место работы', max_length=250, blank=True, help_text='')
	occupation = models.CharField('Род деятельности', max_length=250, blank=True, help_text='')
	phone = models.CharField('Контактный телефон',  max_length=18, null=True)
	email = models.EmailField('E-mail', max_length=75, null=True)
	questionnaire = models.TextField('Анкета', null=True, blank=True)
	status = models.PositiveIntegerField('Статус участия', null=True, choices=CHOICES, default=1)

	class Meta:
		verbose_name = 'Заявка на регистрацию'
		verbose_name_plural = 'Список посетителей'
		ordering = ['email']
		db_table = 'visitors'

	def __str__(self):
		return self.name


class Invitation(models.Model):
	CHOICES = ((0,'рассылка не выполнялась'),(1,'разослано'),)

	forum = models.ForeignKey(Forum, on_delete=models.CASCADE, null=True, related_name='invitation', verbose_name = 'Форум', help_text='')
	content = RichTextUploadingField('Контент', null=True, blank=True, help_text='Контент рассылки')
	visitors = models.ManyToManyField(Visitor, related_name='invited_visitors', blank=True, verbose_name = 'Посетители', help_text='Список приглашенных посетителей')
	status = models.BooleanField('Статус рассылки', blank=True, choices=CHOICES, default=0)
	last_sent_date = models.DateTimeField('Время последней рассылки', null=True, blank=True, auto_now_add=False)

	class Meta:
		verbose_name = 'приглашение'
		verbose_name_plural = 'Приглашения'
		ordering = ['-forum__date_forum']
		db_table = 'invitations'

	def __str__(self):
		return self.forum.title


class Review(models.Model):
	forum = models.ManyToManyField(Forum, related_name='review_forums', verbose_name = 'Форум', help_text='')
	visitor = models.ForeignKey(Visitor, related_name='review_visitor', null=True, blank=True, on_delete=models.CASCADE, verbose_name='Посетитель форума')
	author = models.CharField('Имя автора', max_length=150, null=True, blank=True, help_text='')
	link = models.URLField('Ссылка на сайт', null=True, blank=True, help_text='Внешняя ссылка на сайт автора')
	content = models.TextField("Отзыв", max_length=2000)
	#posted_date = models.DateTimeField("Опубликовано", auto_now_add=True, blank=True)

	class Meta:
		verbose_name = "отзыв"
		verbose_name_plural = "Отзывы посетителей"
		ordering = ['-forum__date_forum']
		#unique_together = ('visitor', 'forum',)
		db_table = 'reviews'

	def __str__(self):
		return self.author or "Отзыв от "+self.visitor.name

