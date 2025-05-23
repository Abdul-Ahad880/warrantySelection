import express from "express";
import { getExpanded } from "../controllers/expandedController.js";

const router = express.Router();

router.get("/", getExpanded);

export default router;
