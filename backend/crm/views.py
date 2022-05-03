from django.shortcuts import render, redirect
from django.http import HttpResponseRedirect
from django.conf import settings

""" Main page """
def index(request):
	context = {}
	return render(request, 'index.html', context)

""" Build site Hook """
def generate_pages(request):
	return HttpResponseRedirect(settings.API_PAGES_RENDER_HOOK)

