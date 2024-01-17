const mongoose = require("mongoose");

const businessSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    category: { type: String, required: true },
    location: {
      type: {
        type: String,
        enum: ["Point"],
        required: true,
      },
      coordinates: {
        type: [Number],
        required: true,
      },
    },
    address: {
      street: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      zip: { type: String, required: true },
      country: { type: String, required: true },
    },
    phone: { type: String, required: true },
    website: { type: String },
    description: { type: String },
    openingHours: {
      type: Map,
      of: String,
    },
    verified: { type: Boolean, default: false },
    adminUserId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    images: [{ type: String }],
    categories: [{ type: String }],
    tags: [{ type: String }],
    services: [{ type: String }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Business", businessSchema);
