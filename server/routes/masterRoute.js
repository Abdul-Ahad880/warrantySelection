import express from "express";
import { getMasterData } from "../controllers/masterController.js";

const router = express.Router();

router.get("/", getMasterData);

export default router;
