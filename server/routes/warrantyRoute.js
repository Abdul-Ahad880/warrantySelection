import express from "express";
import { submitSelectedWarranty } from "../controllers/warrantyController.js";

const router = express.Router();

router.post("/", submitSelectedWarranty);

export default router;
