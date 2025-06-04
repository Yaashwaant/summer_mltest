import os
import pickle
import numpy as np

# Paths to the saved models from the feature folder
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
FEATURE_MODELS_DIR = os.path.abspath(os.path.join(BASE_DIR, "saved_models"))

diabetes_model_path = os.path.join(FEATURE_MODELS_DIR, "diabetes_model.sav")
heart_disease_model_path = os.path.join(FEATURE_MODELS_DIR, "heart_disease_model.sav")
parkinsons_model_path = os.path.join(FEATURE_MODELS_DIR, "parkinsons_model.sav")

# Load models
with open(diabetes_model_path, "rb") as f:
    diabetes_model = pickle.load(f)

with open(heart_disease_model_path, "rb") as f:
    heart_disease_model = pickle.load(f)

with open(parkinsons_model_path, "rb") as f:
    parkinsons_model = pickle.load(f)

def predict_diabetes(input_data):
    """
    input_data: list or array of 8 features in order:
    [Pregnancies, Glucose, BloodPressure, SkinThickness, Insulin,
    BMI, DiabetesPedigreeFunction, Age]
    """
    input_array = np.array(input_data).reshape(1, -1)
    prediction = diabetes_model.predict(input_array)
    return int(prediction[0])

def predict_heart_disease(input_data):
    """
    input_data: list or array of 13 features in order:
    [age, sex, cp, trestbps, chol, fbs, restecg, thalach, exang,
    oldpeak, slope, ca, thal]
    """
    input_array = np.array(input_data).reshape(1, -1)
    prediction = heart_disease_model.predict(input_array)
    return int(prediction[0])

def predict_parkinsons(input_data):
    """
    input_data: list or array of 22 features in order:
    [fo, fhi, flo, Jitter_percent, Jitter_Abs, RAP, PPQ, DDP, Shimmer,
    Shimmer_dB, APQ3, APQ5, APQ, DDA, NHR, HNR, RPDE, DFA, spread1,
    spread2, D2, PPE]
    """
    input_array = np.array(input_data).reshape(1, -1)
    prediction = parkinsons_model.predict(input_array)
    return int(prediction[0])
