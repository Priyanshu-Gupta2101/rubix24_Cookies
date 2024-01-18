const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true, min: 0 },
  images: [
    {
      type: String,
    },
  ],
});

module.exports = mongoose.model("Product", productSchema);
