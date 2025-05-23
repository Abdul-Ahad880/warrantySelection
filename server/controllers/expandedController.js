import Expanded from "../models/Expanded.js";

export const getExpanded = async (req, res) => {
  try {
    const expanded = await Expanded.find();
    res.status(200).json(expanded);
  } catch (error) {}
};
