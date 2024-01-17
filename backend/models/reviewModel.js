const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["User", "Business"],
    required: true,
  },
  typeId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    refPath: "type",
  },
  safetyRating: { type: Number, min: 0, max: 5, required: true },
  honestyRating: { type: Number, min: 0, max: 5, required: true },
  pricingRating: { type: Number, min: 0, max: 5, required: true },
  reviewText: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;
