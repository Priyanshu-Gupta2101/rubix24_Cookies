const Review = require("../models/reviewModel.js");

// Controller to submit a new review
const submitReviewWithRatings = async (req, res) => {
  try {
    const {
      type,
      safetyRating = 0,
      honestyRating = 0,
      pricingRating = 0,
      reviewText,
    } = req.body;

    const id = req.user._id;

    const newReview = new Review({
      type,
      typeId: id,
      safetyRating,
      honestyRating,
      pricingRating,
      reviewText,
    });

    const savedReview = await newReview.save();
    res.status(201).json({ success: true, review: savedReview });
  } catch (error) {
    console.error("Error submitting review with ratings:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find({});
    res.status(200).json(reviews);
  } catch (error) {
    console.error("Error getting reviews:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Controller to get reviews for a user or business
const getReviews = async (req, res) => {
  try {
    const { type } = req.params;

    const typeId = req.user._id;

    if (!["User", "Business"].includes(type)) {
      return res.status(400).json({ error: "Invalid type" });
    }

    const reviews = await Review.find({ type, typeId });
    res.status(200).json(reviews);
  } catch (error) {
    console.error("Error getting reviews:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Controller to update a review
const updateReview = async (req, res) => {
  try {
    const { reviewId } = req.params;
    const { safetyRating, honestyRating, pricingRating, reviewText } = req.body;

    const updatedReview = await Review.findByIdAndUpdate(
      reviewId,
      { safetyRating, honestyRating, pricingRating, reviewText },
      { new: true }
    );

    if (!updatedReview) {
      return res.status(404).json({ error: "Review not found" });
    }

    res.status(200).json(updatedReview);
  } catch (error) {
    console.error("Error updating review:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Controller to delete a review
const deleteReview = async (req, res) => {
  try {
    const { reviewId } = req.params;
    console.log(reviewId);

    const deletedReview = await Review.findByIdAndDelete(reviewId);

    if (!deletedReview) {
      return res.status(404).json({ error: "Review not found" });
    }

    res
      .status(204)
      .json({ success: true, message: "Review successfully deleted" });
  } catch (error) {
    console.error("Error deleting review:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Controller to update the safety rating of a review
const updateSafetyRating = async (req, res) => {
  try {
    const { reviewId } = req.params;
    const { safetyRating } = req.body;

    const updatedReview = await Review.findByIdAndUpdate(
      reviewId,
      { safetyRating },
      { new: true }
    );

    if (!updatedReview) {
      return res.status(404).json({ error: "Review not found" });
    }

    res.status(200).json(updatedReview);
  } catch (error) {
    console.error("Error updating safety rating:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Controller to update the honesty rating of a review
const updateHonestyRating = async (req, res) => {
  try {
    const { reviewId } = req.params;
    const { honestyRating } = req.body;

    const updatedReview = await Review.findByIdAndUpdate(
      reviewId,
      { honestyRating },
      { new: true }
    );

    if (!updatedReview) {
      return res.status(404).json({ error: "Review not found" });
    }

    res.status(200).json(updatedReview);
  } catch (error) {
    console.error("Error updating honesty rating:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Controller to update the pricing rating of a review
const updatePricingRating = async (req, res) => {
  try {
    const { reviewId } = req.params;
    const { pricingRating } = req.body;

    const updatedReview = await Review.findByIdAndUpdate(
      reviewId,
      { pricingRating },
      { new: true }
    );

    if (!updatedReview) {
      return res.status(404).json({ error: "Review not found" });
    }

    res.status(200).json(updatedReview);
  } catch (error) {
    console.error("Error updating pricing rating:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  submitReviewWithRatings,
  getReviews,
  updateReview,
  deleteReview,
  updateSafetyRating,
  updateHonestyRating,
  updatePricingRating,
  getAllReviews,
};
