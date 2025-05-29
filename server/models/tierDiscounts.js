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

const TierDiscounts = mongoose.model("TierDiscounts", TierDiscountsSchema);

export default TierDiscounts;
