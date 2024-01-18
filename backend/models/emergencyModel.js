const mongoose = require("mongoose");

const emergencyContactSchema = new mongoose.Schema({
  name: { type: String },
  relationship: { type: String },
  phone: { type: String },
  isVerified: { type: Boolean, default: false },
  verificationCode: { type: String },
});

module.exports = mongoose.model("EmergencyContact", emergencyContactSchema);
