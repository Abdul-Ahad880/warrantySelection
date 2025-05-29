import express from "express";
import {
  submitSelectedWarranty,
  getBrands,
  getModelCategories,
  getEngineNotes,
  getCodes,
  getSubsystems,
} from "../controllers/warrantyController.js";

const router = express.Router();
router.get("/brands", getBrands);
router.get("/model-categories", getModelCategories);
router.get("/engine-notes", getEngineNotes);
router.get("/codes", getCodes);
router.get("/subsystems", getSubsystems);
router.post("/", submitSelectedWarranty);

export default router;
