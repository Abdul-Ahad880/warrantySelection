import express from "express";
import { getTierDiscount } from "../controllers/tierController.js";

const router = express.Router();

router.get("/", getTierDiscount);

export default router;
