import mongoose from "mongoose";

export const connection = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    // console.log(`MongoDB connected: ${process.env.MONGODB_URI}`);
    console.log("Successfully connected to MongoDB");
  } catch (error) {
    console.log("connection error", error);
  }
};
