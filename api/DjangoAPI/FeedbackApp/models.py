from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator

class Feedbacks(models.Model):
    FeedbackId = models.AutoField(primary_key=True)
    Name = models.CharField(max_length=255)  # Name of the feedback provider
    Rating = models.IntegerField(
        validators=[MinValueValidator(1), MaxValueValidator(5)]  # Restrict values between 1 and 5
    )  
    Description = models.TextField()  # Detailed feedback description
