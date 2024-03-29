const mongoose = require("mongoose");

const businessSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    category: { type: String, required: true },
    location: {
      type: {
        type: String,
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
      type: String,
    },
    verified: { type: Boolean, default: false },
    adminUserId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    images: [
      {
        public_id: {
          type: String,
        },
        url: {
          type: String,
        },
      },
    ],
    categories: [{ type: String }],
    tags: [{ type: String }],
    services: [{ type: String }],
    products: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Business", businessSchema);
