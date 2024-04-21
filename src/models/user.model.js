import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "plz enter the username"],
    unique: true,
  },
  email: {
    type: String,
    required: [true, "plz enter the email"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "plz enter the password"],
    unique: true,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  forgetPasswordToken: String,
  forgetPasswordTokenExpire: Date,
  verifiedToken: String,
  verifiedTokenExpire: Date,
});

export const User =
  mongoose.model.users || mongoose.model("users", userSchema);
