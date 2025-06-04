import express from "express";
import { authenticate } from "../middlewares/authMiddleware.js";
import {
  predictDiabetes,
  predictHeartDisease,
  predictParkinsons,
} from "../controllers/diseaseController.js";

const router = express.Router();

router.post("/diabetes", authenticate, predictDiabetes);
router.post("/heart-disease", authenticate, predictHeartDisease);
router.post("/parkinsons", authenticate, predictParkinsons);

export default router;
