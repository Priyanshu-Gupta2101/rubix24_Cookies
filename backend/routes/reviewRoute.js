const express = require("express");
const {
  submitReviewWithRatings,
  getReviews,
  updateReview,
  deleteReview,
  updateSafetyRating,
  updateHonestyRating,
  updatePricingRating,
} = require("../controllers/reviewController");
const { requireSignIn } = require("../middleware/authMiddleware");

const router = express.Router();

// Submit a new review with individual ratings
router.post(
  "/submit-with-ratings/:type/:typeId",
  requireSignIn,
  submitReviewWithRatings
);

// Get reviews for a user or business
router.get("/:type/:typeId", getReviews);

// Update a review
router.put("/update/:reviewId", requireSignIn, updateReview);

// Delete a review
router.delete("/delete/:reviewId", requireSignIn, deleteReview);

// Update safety rating of a review
router.put(
  "/update-safety-rating/:reviewId",
  requireSignIn,
  updateSafetyRating
);

// Update honesty rating of a review
router.put(
  "/update-honesty-rating/:reviewId",
  requireSignIn,
  updateHonestyRating
);

// Update pricing rating of a review
router.put(
  "/update-pricing-rating/:reviewId",
  requireSignIn,
  updatePricingRating
);

module.exports = router;
