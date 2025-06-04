import os

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
FEATURE_MODELS_DIR = os.path.abspath(os.path.join(BASE_DIR, "../../multiple-disease-prediction-streamlit-app-main/multiple-disease-prediction-streamlit-app-main/saved_models"))
print("Resolved model directory:", FEATURE_MODELS_DIR)
