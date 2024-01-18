const mongoose = require("mongoose");
const EmergencyContact = require("./emergencyModel.js");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
      unique: true,
    },
    role: {
      type: String,
      enum: ["User", "Admin", "MasterAdmin"],
      default: "User",
    },
    photo: {
      public_id: {
        type: String,
      },
      url: {
        type: String,
      },
    },
    address: { type: String },
    nationality: { type: String },
    isEmailVerified: { type: Boolean, default: false },
    emailVerificationCode: {
      type: String,
    },
    emergencyContact: [
      { type: mongoose.Schema.Types.ObjectId, ref: "EmergencyContact" },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
