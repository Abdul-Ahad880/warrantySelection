import express from "express";
import { getSystem } from "../controllers/systemController.js";

const router = express.Router();

router.get("/", getSystem);

export default router;
