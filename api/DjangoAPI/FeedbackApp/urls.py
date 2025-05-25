# here re_path came after the django 4.0 or other wise its url, and the re_path is in the DjangoAPI folder urls.py
from django.urls import re_path
from FeedbackApp import views

from django.conf.urls.static import static
from django.conf import settings

urlpatterns = [
    #re_path route for the feedback
    re_path(r'^feedback$', views.feedbackApi),
    # The delete method will receive id in the URL
    re_path(r'^feedback/([0-9]+)$', views.feedbackApi),
]   