import Systems from "../models/systems.js";

export const getSystem = async (req, res) => {
  try {
    const system = await Systems.find();
    if (!system) {
      return res.status(400).json({ message: "systems not found " });
    }
    res.status(200).json({ system });
  } catch (error) {
    console.log(error);
  }
};
