import Expanded from "../models/expanded.js";

export const getExpanded = async (req, res) => {
  try {
    const expanded = await Expanded.find();
    res.status(200).json(expanded);
    if (!expanded) {
      return res.status(404).json({ message: "Expanded not foound" });
    }
  } catch (error) {}
};
