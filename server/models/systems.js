import mongoose from "mongoose";

const Systems = new mongoose.Schema(
  {
    code: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
    // engOnly: {
    //   type: Boolean,
    //   default: false,
    // },
    // engTrans: {
    //   type: Boolean,
    //   default: false,
    // },
    // powertrain: {
    //   type: Boolean,
    //   default: false,
    // },
    // powertrainPlus: {
    //   type: Boolean,
    //   default: false,
    // },
    comfort: {
      type: Boolean,
      default: false,
    },
    comprehensive: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true, collection: "systems" }
);

export default mongoose.model("systems", Systems);
