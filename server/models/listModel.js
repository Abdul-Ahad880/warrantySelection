import mongoose from "mongoose";

const ListSchema = new mongoose.Schema(
  {
    brand: {
      type: String,
      required: true,
    },
    audi: {
      type: String, // Change this if it needs to be an array or object
    },
  },
  {
    timestamps: true,
    collection: "lists", // Overrides default pluralization
  }
);

export default mongoose.model("List", ListSchema);
