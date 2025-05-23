import express from "express";
import { getLists } from "../controllers/listController.js";
const router = express.Router();

router.get("/", getLists);

export default router;
