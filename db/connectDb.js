import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect("mongodb://localhost:27017/chai", {
      useNewUrlParser: true,
      useUnifiedTopology: true, // Recommended for new versions
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
    process.exit(1); // Optional: force exit on failure
  }
};

export default connectDB;
