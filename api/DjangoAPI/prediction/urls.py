from django.urls import path
from .views import predict_cost

urlpatterns = [
    path('predict/', predict_cost, name='predict_cost'),
]
