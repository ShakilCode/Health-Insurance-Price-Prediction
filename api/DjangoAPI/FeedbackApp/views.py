from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from django.http.response import JsonResponse

#Now import the models that we created
from FeedbackApp.models import Feedbacks
#Also the serializers classes
from FeedbackApp.serializers import FeedbacksSerializer

@csrf_exempt                #Method will receive an optional id which we will need to use in the delete method
def feedbackApi(request,id=0):
                       # GET method we will return all the records in the JSON format 
    if request.method=='GET':
        feedbacks = Feedbacks.objects.all()
        # we are making use of serializer class to convert it into json formet
        feedbacks_serializer=FeedbacksSerializer(feedbacks,many=True)
        # paramete sate=false basically, used to inform django that we are try to convert to json is actually in a valid format and we are fine if there are still any issues in it
        return JsonResponse(feedbacks_serializer.data,safe=False)
    # let's write post method which will be used to insert new records into feedback tables 
    elif request.method=='POST':
        # we are parse the request and using the serializer to convert it into model
        feedback_data=JSONParser().parse(request)
        feedbacks_serializer=FeedbacksSerializer(data=feedback_data)
        # if the model is valid we sabe it into the database
        if feedbacks_serializer.is_valid():
            feedbacks_serializer.save()
            return JsonResponse("Added Successfully",safe=False)
        return JsonResponse("Failed to Add",safe=False)
    # Put method to update a gives method
    elif request.method=='PUT':
        feedback_data=JSONParser().parse(request)
        # first capturing the existing records using feedback ID
        feedback=Feedbacks.objects.get(FeedbackId=feedback_data['FeedbackId'])
        # next mapping it with new value using serializer class
        feedbacks_serializer=FeedbacksSerializer(feedback,data=feedback_data)
        if feedbacks_serializer.is_valid():
            # save it if the model is valid
            feedbacks_serializer.save()
            return JsonResponse("Updated Successfully",safe=False)
        return JsonResponse("Failed to Update")
    # The delete method 
    elif request.method=='DELETE':
        # pasing the id to be deleted from the url
        feedback=Feedbacks.objects.get(FeedbackId=id)
        feedback.delete()
        return JsonResponse("Deleted Successfully",safe=False)

