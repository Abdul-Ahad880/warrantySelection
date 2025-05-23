import MasterData from "../models/MasterData.js";

export const getMasterData = async (req, res) => {
  try {
    const masterData = await MasterData.find();
    res.status(200).json(masterData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
