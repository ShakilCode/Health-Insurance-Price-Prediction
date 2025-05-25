from django.http import JsonResponse
import pickle
import numpy as np
from rest_framework.decorators import api_view
from .models import Prediction

# Load the model (ensure the path is correct)
MODEL_PATH = 'prediction/models/MIPML.pkl'
with open(MODEL_PATH, 'rb') as file:
    model = pickle.load(file)

# Disease mapping
disease_mapping = {
    'no': 0,
    'heart disease': 1,
    'advanced-stage cancer': 2,
    'mental and behavioral disorders': 3,
    'liver disease': 4,
    'aids': 5,
    'coma': 6
}

@api_view(['GET', 'POST', 'DELETE'])
def predict_cost(request):
    if request.method == 'GET':
        predictions = Prediction.objects.all()
        prediction_list = []
        for p in predictions:
            prediction_list.append({
                'id': p.id,
                'age': p.age,
                'gender': 'Female' if p.gender == 0 else 'Male',
                'bmi': p.bmi,
                'smoker': 'yes' if p.smoker == 1 else 'no',
                'alcohol_consumer': 'Yes' if p.alcohol_consumer == 1 else 'No',
                'disease': list(disease_mapping.keys())[list(disease_mapping.values()).index(p.disease)],
                'predicted_cost': p.predicted_cost
            })
        return JsonResponse(prediction_list, safe=False)

    elif request.method == 'POST':
        try:
            data = request.data
            age = data.get('age')
            gender = 0 if data.get('gender') == 'Female' else 1
            bmi = data.get('bmi')
            smoker = 1 if data.get('smoker') == 'yes' else 0
            alcohol_consumer = 1 if data.get('alcohol_consumer') == 'Yes' else 0

            disease_key = str(data.get('disease', '')).strip().lower()
            if disease_key not in disease_mapping:
                return JsonResponse({'error': f'Invalid disease type: {disease_key}'}, status=400)
            disease = disease_mapping[disease_key]

            input_data = np.array([[age, gender, bmi, smoker, alcohol_consumer, disease]])
            prediction = model.predict(input_data)[0]

            new_prediction = Prediction(
                age=age,
                gender=gender,
                bmi=bmi,
                smoker=smoker,
                alcohol_consumer=alcohol_consumer,
                disease=disease,
                predicted_cost=prediction
            )
            new_prediction.save()

            return JsonResponse({'predicted_cost': prediction})

        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)

    elif request.method == 'DELETE':
        try:
            prediction_id = request.data.get('id')
            prediction = Prediction.objects.get(id=prediction_id)
            prediction.delete()
            return JsonResponse({'message': f'Prediction with ID {prediction_id} deleted successfully'})
        except Prediction.DoesNotExist:
            return JsonResponse({'error': 'Prediction not found'}, status=404)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)
