import re
from os import path, remove
from threading import Thread
from django.conf import settings
from django.utils.html import format_html
from django.core.mail import EmailMessage, BadHeaderError
from django.core.files.storage import FileSystemStorage
from os import path, remove, rename
from glob import glob
from shutil import rmtree
from PIL import Image
from imagekit import ImageSpec
from imagekit.processors import ResizeToFit #, ResizeToFill
from imagekit.cachefiles import ImageCacheFile

from uuslug import slugify



# delete main image and its thumbs
def remove_images(obj):
	if obj.path:
		filename, ext = path.splitext(obj.path)
		cache_folder = filename.replace('/media/', '/media/CACHE/images/')
		rmtree(cache_folder, ignore_errors=True)
		# select all thumbs for original file
		files = glob(filename+'_[0-9][0-9][0-9]*w'+ext)
		# add to files array if original file exists on disk
		if path.isfile(obj.path) or path.islink(obj.path):
			files.append(obj.path)
		for f in files:
			remove(f)


def is_file_exist(obj):
	return path.isfile(path.join(settings.MEDIA_ROOT,obj.name))


def is_image_file(obj):
	filename, ext = path.splitext(obj.file.name)
	return ext.lower() == '.jpg' or ext.lower() == '.jpeg' or ext.lower() == '.png'


class AdminThumbnail(ImageSpec):
	w = settings.ADMIN_THUMBNAIL_SIZE[0]
	h = settings.ADMIN_THUMBNAIL_SIZE[1]

	processors = [ResizeToFit(w,h)]
	format = 'JPEG'
	options = {'quality': settings.ADMIN_THUMBNAIL_QUALITY }


def get_admin_thumb(obj):
	if obj and is_file_exist(obj) and is_image_file(obj) :
		thumb = update_admin_thumb(obj)
		#print(f'get admin thumb {thumb.url}')
		if thumb.url:
			return format_html('<img src="{0}" max-width="50"/>', thumb.url)
	return format_html('<img src="/media/no-image.jpg" width="50"/>')


def update_admin_thumb(obj):
	thumbnail = ImageCacheFile(AdminThumbnail(obj))
	#print(thumbnail)
	thumbnail.generate()
	return thumbnail


def generate_thumbs(obj, sizes):
	if obj and is_file_exist(obj) and is_image_file(obj) :
		file = obj.path
		filename, ext = path.splitext(file)
		with Image.open(file) as image:
			im_w, im_h = image.size
			aspect_ratio = im_w / float(im_h)

			for size in sizes:
				im = image.copy()
				thumb_w = size
				thumb_h = int(thumb_w / aspect_ratio)
				im.thumbnail((thumb_w, thumb_h))
				thumb_filename = '{0}_{1}w{2}'.format(filename, size, ext)
				im.save(thumb_filename)


class MediaFileStorage(FileSystemStorage):
	def __init__(self, **kwargs):
		self.output_name = kwargs.get('output', None)
		super().__init__()


	def get_available_name(self, name, max_length=None):
		if self.output_name:
			name = self.output_name
		else:
			upload_folder, filename = path.split(name)
			if upload_folder:
				upload_folder += '/'
			#print(upload_folder, filename)
			filename, ext = path.splitext(filename)
			name = upload_folder+slugify(filename)+ext

		if path.exists(self.path(name)): # если такой файл есть на диске, то удалим его
			remove(self.path(name))

		return name


def ForumUploadTo(instance, filename):
	forum_slug = instance.forum if 'forum' in instance._meta.fields else ''
	return '{0}{1}/{2}'.format(settings.FILES_UPLOAD_FOLDER, forum_slug, filename)


""" Return True if the request comes from a mobile device """
def IsMobile(request):
	import re

	MOBILE_AGENT_RE=re.compile(r".*(iphone|mobile|androidtouch)",re.IGNORECASE)

	if MOBILE_AGENT_RE.match(request.META['HTTP_USER_AGENT']):
		return True
	else:
		return False


def update_google_sitemap():
	try:
		ping_google() #сообщим Google о изменениях в sitemap.xml
	except Exception:
		pass


def addDomainToUrl(request, value, pattern, start=False):
	if request:
		scheme = request.is_secure() and "https" or "http"
		SITE_DOMAIN = '%s://%s' % (scheme, request.META['HTTP_HOST'])
		SEARCH_PATTERN = pattern.replace('<URL>', '')
		REPLACE_WITH = pattern.replace('<URL>', SITE_DOMAIN)
		to_replace = value.startswith(SEARCH_PATTERN) if start else True
		if to_replace:
			url = value.replace(SEARCH_PATTERN, REPLACE_WITH)

		return url
	return value


""" Sending email """
def SendEmail(subject, template, email_ricipients=settings.EMAIL_RICIPIENTS):
	email = EmailMessage(
		subject,
		template,
		settings.EMAIL_HOST_USER,
		email_ricipients,
	)

	email.content_subtype = "html"
	email.html_message = True
	email.fail_silently=False

	try:
		email.send()
	except BadHeaderError:
		return False

	return True


""" Async email sending class """
class EmailThread(Thread):
	def __init__(self, subject, template, email_ricipients):
		self.subject = subject
		self.html_content = template
		self.recipient_list = email_ricipients
		Thread.__init__(self)

	def run(self):
		return SendEmail(self.subject, self.html_content, self.recipient_list)


""" Sending email to recipients """
def SendEmailAsync(subject, template, email_ricipients=settings.EMAIL_RICIPIENTS):
	EmailThread(subject, template, email_ricipients).start()



def get_admin_site_url(request):
	protocol = 'https' if request.is_secure() else 'http'
	admin_url = "{0}://{1}".format(protocol, request.get_host())
	return admin_url



def get_site_url(request):
	scheme = request.is_secure() and "https" or "http"
	url = settings.CORS_ALLOWED_ORIGINS[0] if len(settings.CORS_ALLOWED_ORIGINS) > 0 else '%s://%s' % (scheme, request.META['HTTP_HOST'])
	name = re.compile(r"https?://(www\.)?")
	name = name.sub('', url).strip().strip('/')
	site = {
		'url': url,
		'name': name
	}
	return site



def get_visitor_reg_num(instance):
	return f'{instance.id:03}-{instance.forum.date_forum.day:02}{instance.forum.date_forum.month:02}{instance.forum.date_forum.year:04}'

