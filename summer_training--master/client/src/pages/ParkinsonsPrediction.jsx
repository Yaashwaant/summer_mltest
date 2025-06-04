import React, { useState } from "react";
import axios from "axios";

const ParkinsonsPrediction = () => {
  const [formData, setFormData] = useState({
    fo: "",
    fhi: "",
    flo: "",
    Jitter_percent: "",
    Jitter_Abs: "",
    RAP: "",
    PPQ: "",
    DDP: "",
    Shimmer: "",
    Shimmer_dB: "",
    APQ3: "",
    APQ5: "",
    APQ: "",
    DDA: "",
    NHR: "",
    HNR: "",
    RPDE: "",
    DFA: "",
    spread1: "",
    spread2: "",
    D2: "",
    PPE: "",
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
      parseFloat(formData.fo),
      parseFloat(formData.fhi),
      parseFloat(formData.flo),
      parseFloat(formData.Jitter_percent),
      parseFloat(formData.Jitter_Abs),
      parseFloat(formData.RAP),
      parseFloat(formData.PPQ),
      parseFloat(formData.DDP),
      parseFloat(formData.Shimmer),
      parseFloat(formData.Shimmer_dB),
      parseFloat(formData.APQ3),
      parseFloat(formData.APQ5),
      parseFloat(formData.APQ),
      parseFloat(formData.DDA),
      parseFloat(formData.NHR),
      parseFloat(formData.HNR),
      parseFloat(formData.RPDE),
      parseFloat(formData.DFA),
      parseFloat(formData.spread1),
      parseFloat(formData.spread2),
      parseFloat(formData.D2),
      parseFloat(formData.PPE),
    ];

    try {
      const response = await axios.post("/api/disease/parkinsons", { input });
      setResult(response.data.prediction === 1 ? "The person has Parkinson's disease" : "The person does not have Parkinson's disease");
    } catch (err) {
      setError(err.response?.data?.error || "Error occurred");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Parkinson's Disease Prediction</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
{Object.keys(formData).map((key) => (
  <div key={key}>
    <label className="block mb-1 font-semibold" htmlFor={key}>
      {key} (0-100)
    </label>
    <input
      type="number"
      step="any"
      min="0"
      max="100"
      id={key}
      name={key}
      value={formData[key]}
      onChange={handleChange}
      required
      className="w-full border border-gray-300 rounded px-3 py-2"
    />
  </div>
))}
        <div className="col-span-2">
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Predict
          </button>
        </div>
      </form>
      {result && <div className="mt-4 p-2 bg-green-100 text-green-800 rounded">{result}</div>}
      {error && <div className="mt-4 p-2 bg-red-100 text-red-800 rounded">{error}</div>}
    </div>
  );
};

export default ParkinsonsPrediction;
