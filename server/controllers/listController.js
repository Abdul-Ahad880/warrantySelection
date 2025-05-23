import listModel from "../models/listModel.js";

export const getLists = async (req, res) => {
  try {
    const list = await listModel.find();
    res.status(200).json({ list });
  } catch (error) {
    console.log(error);
  }
};
