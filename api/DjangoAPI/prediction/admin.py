from django.contrib import admin
from .models import Prediction

@admin.register(Prediction)
class PredictionAdmin(admin.ModelAdmin):
    list_display = ('age', 'gender', 'bmi', 'smoker','alcohol_consumer', 'disease', 'predicted_cost')
