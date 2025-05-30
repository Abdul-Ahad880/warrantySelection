import Expanded from "../models/expanded.js";

// export const submitSelectedWarranty = async (req, res) => {
//   try {
//     const { brand, modelCategory, engineNotes, selectedCodes } = req.body;

//     if (!brand || !modelCategory || !engineNotes || !selectedCodes?.length) {
//       return res.status(400).json({ message: "Missing required fields" });
//     }

//     const selectedSubsystems = await Expanded.find({
//       brand,
//       modelCategory,
//       engineNotes,
//       code: { $in: selectedCodes },
//     });

//     const total = selectedSubsystems.reduce((sum, item) => sum + item.price, 0);
//     res.status(200).json({ selectedSubsystems, total });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Server error" });
//   }
// };
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

    // Corrected total calculation
    const total = selectedSubsystems.reduce((sum, item) => {
      // Ensure item.price is a number; default to 0 if not
      const price = typeof item.price === "number" ? item.price : 0;
      return sum + price;
    }, 0);

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
  const { brand } = req.query;

  if (!brand) {
    return res.status(400).json({ message: "Brand is required" });
  }

  const modelCategories = await Expanded.find({ brand }).distinct(
    "modelCategory"
  );

  if (!modelCategories.length) {
    return res.status(404).json({ message: "No model categories found" });
  }

  res.json(modelCategories);
};

export const getEngineNotes = async (req, res) => {
  const { brand, modelCategory } = req.query;

  if (!brand || !modelCategory) {
    return res
      .status(400)
      .json({ message: "Brand and model category are required" });
  }

  const engineNotes = await Expanded.find({ brand, modelCategory }).distinct(
    "engineNotes"
  );

  if (!engineNotes.length) {
    return res.status(404).json({ message: "No engine notes found" });
  }

  res.json(engineNotes);
};

// export const getCodes = async (req, res) => {
//   const { brand, modelCategory, engineNotes } = req.query;

//   if (!brand || !modelCategory || !engineNotes) {
//     return res.status(400).json({
//       message: "Brand, model category, and engine notes are required",
//     });
//   }

//   const codes = await Expanded.find({
//     brand,
//     modelCategory,
//     engineNotes,
//   }).distinct("code");

//   if (!codes.length) {
//     return res.status(404).json({ message: "No codes found" });
//   }

//   res.json(codes);
// };

export const getCodes = async (req, res) => {
  const { brand, modelCategory, engineNotes } = req.query;

  if (!brand || !modelCategory || !engineNotes) {
    return res.status(400).json({
      message: "Brand, model category, and engine notes are required",
    });
  }

  // Fetch documents with needed fields
  const records = await Expanded.find(
    { brand, modelCategory, engineNotes },
    { code: 1, subSystem: 1, _id: 1 }
  );

  if (!records.length) {
    return res.status(404).json({ message: "No codes found" });
  }

  // Optionally filter for unique code-subsystem pa
  const uniqueMap = new Map();
  records.forEach((rec) => {
    if (!uniqueMap.has(rec.code)) {
      uniqueMap.set(rec.code, rec);
    }
  });

  res.json(Array.from(uniqueMap.values()));
};

export const getSubsystems = async (req, res) => {
  const { brand, modelCategory, engineNotes, code } = req.query;

  if (!brand || !modelCategory || !engineNotes || !code) {
    return res.status(400).json({
      message: "Brand, model category, engine notes, and code are required",
    });
  }

  const subsystems = await Expanded.find({
    brand,
    modelCategory,
    engineNotes,
    code,
  });

  if (!subsystems.length) {
    return res.status(404).json({ message: "No subsystems found" });
  }

  res.json(subsystems);
};
