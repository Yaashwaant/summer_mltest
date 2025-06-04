import sys
import json
from disease_predictor import predict_diabetes, predict_heart_disease, predict_parkinsons

def main():
    if len(sys.argv) < 3:
        print(json.dumps({"error": "Insufficient arguments"}))
        sys.exit(1)

    disease = sys.argv[1]
    try:
        input_data = json.loads(sys.argv[2])
    except Exception as e:
        print(json.dumps({"error": f"Invalid input data: {str(e)}"}))
        sys.exit(1)

    if disease == "diabetes":
        result = predict_diabetes(input_data)
    elif disease == "heart-disease":
        result = predict_heart_disease(input_data)
    elif disease == "parkinsons":
        result = predict_parkinsons(input_data)
    else:
        print(json.dumps({"error": "Unknown disease type"}))
        sys.exit(1)

    print(json.dumps({"prediction": result}))

if __name__ == "__main__":
    main()
