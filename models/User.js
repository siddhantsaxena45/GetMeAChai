import mongoose from "mongoose";
const { Schema, model } = mongoose;

const userSchema = new Schema(
  {
    name: { type: String },
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    profilepic: { type: String },
    coverpic: { type: String },
    razorpay_secret: { type: String },
    razorpay_id: { type: String },
  },
  {
    timestamps: true, // handles createdAt & updatedAt
  }
);

// Prevent model overwrite error in dev/hot reload
export default mongoose.models.User || model("User", userSchema);
