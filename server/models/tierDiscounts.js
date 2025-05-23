import mongoose from "mongoose";

const TierDiscountsSchema = new mongoose.Schema(
  {
    tier: {
      type: String,
    },
    discount: {
      type: String,
    },
  },

  { timestamps: true, collection: "tierdiscounts" }
);

export const TierDiscounts = mongoose.model(
  "tierdiscounts",
  TierDiscountsSchema
);
