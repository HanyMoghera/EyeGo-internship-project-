import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const mongoURI =
      process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/posts_db";
    await mongoose.connect(mongoURI);
    console.log("MongoDB Connected");
  } catch (err) {
    console.error("Connection Error:", err.message);
  }
};

export default connectDB;
