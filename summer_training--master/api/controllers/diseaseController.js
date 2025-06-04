import { exec } from "child_process";
import path from "path";

const PYTHON_PATH = "python"; // or full path to python executable if needed
const SCRIPT_PATH = path.resolve("api/ml/predict_api.py");

function runPythonPredict(disease, inputData) {
  return new Promise((resolve, reject) => {
    const inputJson = JSON.stringify(inputData);
    const command = `${PYTHON_PATH} "${SCRIPT_PATH}" ${disease} '${inputJson}'`;

    exec(command, (error, stdout, stderr) => {
      if (error) {
        return reject(stderr || error.message);
      }
      try {
        const result = JSON.parse(stdout);
        if (result.error) {
          return reject(result.error);
        }
        resolve(result.prediction);
      } catch (e) {
        reject("Invalid JSON response from prediction script");
      }
    });
  });
}

export const predictDiabetes = async (req, res) => {
  try {
    const inputData = req.body.input; // Expect input array in req.body.input
    if (!Array.isArray(inputData) || inputData.length !== 8) {
      return res.status(400).json({ error: "Invalid input data for diabetes prediction" });
    }
    const prediction = await runPythonPredict("diabetes", inputData);
    res.json({ prediction });
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
};

export const predictHeartDisease = async (req, res) => {
  try {
    const inputData = req.body.input; // Expect input array in req.body.input
    if (!Array.isArray(inputData) || inputData.length !== 13) {
      return res.status(400).json({ error: "Invalid input data for heart disease prediction" });
    }
    const prediction = await runPythonPredict("heart-disease", inputData);
    res.json({ prediction });
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
};

export const predictParkinsons = async (req, res) => {
  try {
    const inputData = req.body.input; // Expect input array in req.body.input
    if (!Array.isArray(inputData) || inputData.length !== 22) {
      return res.status(400).json({ error: "Invalid input data for Parkinson's prediction" });
    }
    const prediction = await runPythonPredict("parkinsons", inputData);
    res.json({ prediction });
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
};
