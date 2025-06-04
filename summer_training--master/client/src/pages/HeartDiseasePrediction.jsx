import React, { useState } from "react";
import axios from "axios";

const HeartDiseasePrediction = () => {
  const [formData, setFormData] = useState({
    age: "",
    sex: "",
    cp: "",
    trestbps: "",
    chol: "",
    fbs: "",
    restecg: "",
    thalach: "",
    exang: "",
    oldpeak: "",
    slope: "",
    ca: "",
    thal: "",
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
      parseFloat(formData.age),
      parseFloat(formData.sex),
      parseFloat(formData.cp),
      parseFloat(formData.trestbps),
      parseFloat(formData.chol),
      parseFloat(formData.fbs),
      parseFloat(formData.restecg),
      parseFloat(formData.thalach),
      parseFloat(formData.exang),
      parseFloat(formData.oldpeak),
      parseFloat(formData.slope),
      parseFloat(formData.ca),
      parseFloat(formData.thal),
    ];

    try {
      const response = await axios.post("http://localhost:8000/predict/heart-disease", { input });
      setResult(response.data.prediction === 1 ? "The person is having heart disease" : "The person does not have any heart disease");
    } catch (err) {
      setError(err.response?.data?.error || "Error occurred");
    }
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Heart Disease Prediction</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
{Object.keys(formData).map((key) => {
  if (key === "sex") {
    return (
      <div key={key}>
        <label className="block mb-1 font-semibold" htmlFor={key}>
          {key}
        </label>
        <select
          id={key}
          name={key}
          value={formData[key]}
          onChange={handleChange}
          required
          className="w-full border border-gray-300 rounded px-3 py-2"
        >
          <option value="">Select</option>
          <option value="0">Female</option>
          <option value="1">Male</option>
        </select>
      </div>
    );
  } else if (key === "cp") {
    return (
      <div key={key}>
        <label className="block mb-1 font-semibold" htmlFor={key}>
          {key} (Pain severity scale: 0=Asymptomatic, 1=Non-anginal, 2=Atypical, 3=Typical)
        </label>
        <select
          id={key}
          name={key}
          value={formData[key]}
          onChange={handleChange}
          required
          className="w-full border border-gray-300 rounded px-3 py-2"
        >
          <option value="">Select</option>
          <option value="3">Typical Angina (3)</option>
          <option value="2">Atypical Angina (2)</option>
          <option value="1">Non-anginal Pain (1)</option>
          <option value="0">Asymptomatic (0)</option>
        </select>
      </div>
    );
  } else if (key === "fbs") {
    return (
      <div key={key}>
        <label className="block mb-1 font-semibold" htmlFor={key}>
          {key} (Fasting Blood Sugar (fbs): 0 = ≤120 mg/dl, 1 = {">"}120 mg/dl
)
        </label>
        <select
          id={key}
          name={key}
          value={formData[key]}
          onChange={handleChange}
          required
          className="w-full border border-gray-300 rounded px-3 py-2"
        >
          <option value="">Select</option>
          <option value="0">≤ 120 mg/dl (0)</option>
          <option value="1">{">"} 120 mg/dl (1)</option>

        </select>
      </div>
    );
  } else if (key === "restecg") {
    return (
      <div key={key}>
        <label className="block mb-1 font-semibold" htmlFor={key}>
          {key} (Resting ECG: 0=Normal, 1=ST-T Abnormality, 2=Left Ventricular Hypertrophy)
        </label>
        <select
          id={key}
          name={key}
          value={formData[key]}
          onChange={handleChange}
          required
          className="w-full border border-gray-300 rounded px-3 py-2"
        >
          <option value="">Select</option>
          <option value="0">Normal (0)</option>
          <option value="1">ST-T Wave Abnormality (1)</option>
          <option value="2">Left Ventricular Hypertrophy (2)</option>
        </select>
      </div>
    );
  } else if (key === "exang") {
    return (
      <div key={key}>
        <label className="block mb-1 font-semibold" htmlFor={key}>
          {key} (Exercise induced angina: 0=No, 1=Yes)
        </label>
        <select
          id={key}
          name={key}
          value={formData[key]}
          onChange={handleChange}
          required
          className="w-full border border-gray-300 rounded px-3 py-2"
        >
          <option value="">Select</option>
          <option value="0">No (0)</option>
          <option value="1">Yes (1)</option>
        </select>
      </div>
    );
  } else if (key === "slope") {
    return (
      <div key={key}>
        <label className="block mb-1 font-semibold" htmlFor={key}>
          {key} (Slope of peak exercise ST segment: 0=Upsloping, 1=Flat, 2=Downsloping)
        </label>
        <select
          id={key}
          name={key}
          value={formData[key]}
          onChange={handleChange}
          required
          className="w-full border border-gray-300 rounded px-3 py-2"
        >
          <option value="">Select</option>
          <option value="0">Upsloping (0)</option>
          <option value="1">Flat (1)</option>
          <option value="2">Downsloping (2)</option>
        </select>
      </div>
    );
  } else if (key === "ca") {
    return (
      <div key={key}>
        <label className="block mb-1 font-semibold" htmlFor={key}>
          {key} (Number of major vessels: 0-4)
        </label>
        <select
          id={key}
          name={key}
          value={formData[key]}
          onChange={handleChange}
          required
          className="w-full border border-gray-300 rounded px-3 py-2"
        >
          <option value="">Select</option>
          <option value="0">0</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
        </select>
      </div>
    );
  } else if (key === "thal") {
    return (
      <div key={key}>
        <label className="block mb-1 font-semibold" htmlFor={key}>
          {key} (Thalassemia: 1=Normal, 2=Fixed Defect, 3=Reversible Defect)
        </label>
        <select
          id={key}
          name={key}
          value={formData[key]}
          onChange={handleChange}
          required
          className="w-full border border-gray-300 rounded px-3 py-2"
        >
          <option value="">Select</option>
          <option value="1">Normal (1)</option>
          <option value="2">Fixed Defect (2)</option>
          <option value="3">Reversible Defect (3)</option>
        </select>
      </div>
    );
  } else {
    return (
      <div key={key}>
        <label className="block mb-1 font-semibold" htmlFor={key}>
          {key}
        </label>
        <input
          type="number"
          step="any"
          min={
            key === "age"
              ? "0"
              : key === "cp"
              ? "0"
              : key === "trestbps"
              ? "0"
              : key === "chol"
              ? "0"
              : key === "fbs"
              ? "0"
              : key === "restecg"
              ? "0"
              : key === "thalach"
              ? "0"
              : key === "exang"
              ? "0"
              : key === "oldpeak"
              ? "0"
              : key === "slope"
              ? "0"
              : key === "ca"
              ? "0"
              : key === "thal"
              ? "0"
              : undefined
          }
          max={
            key === "age"
              ? "120"
              : key === "cp"
              ? "4"
              : key === "trestbps"
              ? "300"
              : key === "chol"
              ? "600"
              : key === "fbs"
              ? "1"
              : key === "restecg"
              ? "2"
              : key === "thalach"
              ? "250"
              : key === "exang"
              ? "1"
              : key === "oldpeak"
              ? "10"
              : key === "slope"
              ? "3"
              : key === "ca"
              ? "4"
              : key === "thal"
              ? "3"
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
    );
  }
})}
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

export default HeartDiseasePrediction;
