import Expanded from "../models/Expanded.js";

export const submitSelectedWarranty = async (req, res) => {
  try {
    const { brand, modelCategory, engineNotes, selectedCodes } = req.body;

    if (!brand || !modelCategory || !engineNotes || !selectedCodes?.length) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const selectedSubsystems = await Expanded.find({
      brand,
      modelCategory,
      engineNotes,
      code: { $in: selectedCodes },
    });

    const total = selectedSubsystems.reduce((sum, item) => sum + item.price, 0);
    res.status(200).json({ selectedSubsystems, total });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

export const getBrands = async (req, res) => {
  const brands = await Expanded.distinct("brand");
  if (!brands || brands.length === 0) {
    return res.status(404).json({ message: "No brands found" });
  }

  res.json(brands);
};

export const getModelCategories = async (req, res) => {
  const modelCategories = await Expanded.find().distinct("modelCategory");
  if (!modelCategories || modelCategories.length === 0) {
    return res.status(404).json({ message: "No model categories found" });
  }

  res.json(modelCategories);
};

export const getEngineNotes = async (req, res) => {
  const engineNotes = await Expanded.find().distinct("engineNotes");
  if (!engineNotes || engineNotes.length === 0) {
    return res.status(404).json({ message: "No engine notes found" });
  }
  res.json(engineNotes);
};

export const getCodes = async (req, res) => {
  const codes = await Expanded.find().distinct("code");
  if (!codes || codes.length === 0) {
    return res.status(404).json({ message: "No codes found" });
  }

  res.json(codes);
};
