import mongoose from "mongoose";

const Expanded = new mongoose.Schema(
  {
    brand: {
      type: String,
      required: true,
    },
    modelCategory: {
      type: String,
      required: true,
    },
    engineNotes: {
      type: String,
      required: true,
    },
    code: {
      type: String,
      required: true,
    },
    subSystem: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true, collection: "expanded" }
);

export default mongoose.models.expanded || mongoose.model("expanded", Expanded);
