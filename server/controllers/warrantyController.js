import Expanded from "../models/expanded.js";
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
