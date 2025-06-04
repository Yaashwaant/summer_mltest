import React, { useState } from "react";
import axios from "axios";

const DiabetesPrediction = () => {
  const [formData, setFormData] = useState({
    Pregnancies: "",
    Glucose: "",
    BloodPressure: "",
    SkinThickness: "",
    Insulin: "",
    BMI: "",
    DiabetesPedigreeFunction: "",
    Age: "",
  });

  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setResult(null);

    const input = [
      parseFloat(formData.Pregnancies),
      parseFloat(formData.Glucose),
      parseFloat(formData.BloodPressure),
      parseFloat(formData.SkinThickness),
      parseFloat(formData.Insulin),
      parseFloat(formData.BMI),
      parseFloat(formData.DiabetesPedigreeFunction),
      parseFloat(formData.Age),
    ];

    try {
      const response = await axios.post("http://localhost:8000/predict/diabetes", { input });
      setResult(response.data.prediction === 1 ? "The person is diabetic" : "The person is not diabetic");
    } catch (err) {
      setError(err.response?.data?.error || "Error occurred");
    }
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Diabetes Prediction</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
{Object.keys(formData).map((key) => (
  <div key={key}>
    <label className="block mb-1 font-semibold" htmlFor={key}>
      {key} {key === "Pregnancies" ? "(0-20)" : key === "Age" ? "(0-120)" : key === "Glucose" ? "(0-300)" : key === "BloodPressure" ? "(0-200)" : key === "SkinThickness" ? "(0-100)" : key === "Insulin" ? "(0-900)" : key === "BMI" ? "(0-70)" : key === "DiabetesPedigreeFunction" ? "(0-2)" : ""}
    </label>
    <input
      type="number"
      step="any"
      min={
        key === "Pregnancies" || key === "Age"
          ? "0"
          : key === "Glucose" || key === "BloodPressure" || key === "SkinThickness" || key === "Insulin" || key === "BMI" || key === "DiabetesPedigreeFunction"
          ? "0"
          : undefined
      }
      max={
        key === "Pregnancies"
          ? "20"
          : key === "Age"
          ? "120"
          : key === "Glucose"
          ? "300"
          : key === "BloodPressure"
          ? "200"
          : key === "SkinThickness"
          ? "100"
          : key === "Insulin"
          ? "900"
          : key === "BMI"
          ? "70"
          : key === "DiabetesPedigreeFunction"
          ? "2"
          : undefined
      }
      id={key}
      name={key}
      value={formData[key]}
      onChange={handleChange}
      required
      className="w-full border border-gray-300 rounded px-3 py-2"
    />
  </div>
))}
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Predict
        </button>
      </form>
      {result && <div className="mt-4 p-2 bg-green-100 text-green-800 rounded">{result}</div>}
      {error && <div className="mt-4 p-2 bg-red-100 text-red-800 rounded">{error}</div>}
    </div>
  );
};

export default DiabetesPrediction;
