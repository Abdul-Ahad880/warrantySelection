import { TierDiscounts } from "../models/TierDiscounts.js";

export const getTierDiscount = async (req, res) => {
  try {
    const tier = await TierDiscounts.find();
    res.status(200).json({ tier });
    if (!tier || tier.length === 0) {
      return res.status(404).json({ message: "Tier discounts not found" });
    }
  } catch (error) {
    console.log(error);
  }
};
