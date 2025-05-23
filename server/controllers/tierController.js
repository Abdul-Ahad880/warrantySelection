import { TierDiscounts } from "../models/TierDiscounts.js";

export const getTierDiscount = async (req, res) => {
  try {
    const tier = await TierDiscounts.find();
    res.status(200).json({ tier });
  } catch (error) {
    console.log(error);
  }
};
