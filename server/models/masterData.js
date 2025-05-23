import mongoose from "mongoose";

const MasterData = new mongoose.Schema(
  {
    brand: {
      type: String,
    },
    model: {
      type: String,
    },
    engine: {
      type: String,
    },
  },

  { timestamps: true, collection: "masterdata" }
);

// export const MasterData = mongoose.model("masterdata", MasterData);
export default mongoose.model("masterdata", MasterData);
