from rest_framework import serializers
from FeedbackApp.models import Feedbacks

class FeedbacksSerializer(serializers.ModelSerializer):
    class Meta:
        model=Feedbacks 
        fields=('FeedbackId','Name','Rating','Description')