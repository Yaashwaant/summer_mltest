from flask import Flask, request, jsonify
from disease_predictor import predict_diabetes, predict_heart_disease, predict_parkinsons
from flask_cors import CORS

app = Flask(__name__)
CORS(app, origins=["http://localhost:5173"])

@app.route('/predict/diabetes', methods=['POST'])
def predict_diabetes_route():
    data = request.json
    print("Received data:", data)
    input_data = data.get("input")
    print("Input data for prediction:", input_data)
    prediction = predict_diabetes(input_data)
    return jsonify({'prediction': prediction})

@app.route('/predict/heart-disease', methods=['POST'])
def predict_heart_disease_route():
    data = request.json
    input_data = data.get("input")
    prediction = predict_heart_disease(input_data)
    return jsonify({'prediction': prediction})

@app.route('/predict/parkinsons', methods=['POST'])
def predict_parkinsons_route():
    data = request.json
    input_data = data.get("input")
    prediction = predict_parkinsons(input_data)
    return jsonify({'prediction': prediction})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8000)
