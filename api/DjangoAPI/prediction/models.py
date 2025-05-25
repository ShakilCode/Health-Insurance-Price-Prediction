from django.db import models

class Prediction(models.Model):
    age = models.IntegerField()
    gender = models.IntegerField()  # 0 for Female, 1 for Male
    bmi = models.FloatField()
    smoker = models.IntegerField()  # 0 for non-smoker, 1 for smoker
    alcohol_consumer = models.IntegerField()  # 0 for non-alcohol consumer, 1 for alcohol consumer
    disease = models.IntegerField()  # Encoded disease values
    predicted_cost = models.FloatField()

    def __str__(self):
        return f'Prediction {self.id} - {self.predicted_cost} LKR per month'
