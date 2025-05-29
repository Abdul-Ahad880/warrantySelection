import MasterData from "../models/masterData.js";

export const getMasterData = async (req, res) => {
  try {
    const masterData = await MasterData.find();
    res.status(200).json(masterData);
    if (!masterData || masterData.length === 0) {
      return res.status(404).json({ message: "Master data not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
