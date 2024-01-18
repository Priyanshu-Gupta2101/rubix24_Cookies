const express = require("express");
const {
  createBusiness,
  deleteBusinessById,
  getAllBusinesses,
  getBusinessById,
  updateBusinessById,
  updateBusinessOpeningHours,
  updateBusinessLocation,
  updateBusinessCategory,
} = require("../controllers/businessController.js");
const {
  requireSignIn,
  isBusinessOwner,
} = require("../middleware/authMiddleware.js");

const router = express.Router();

// Create a new business
router.post("/create", requireSignIn, createBusiness);

// Get all businesses
router.get("/all", getAllBusinesses);

// Get a single business by ID
router.get("/get/:businessId", getBusinessById);

// Update a business by ID
router.put(
  "/update/:businessId",
  requireSignIn,
  isBusinessOwner,
  updateBusinessById
);

// Delete a business by ID
router.delete(
  "/delete/:businessId",
  requireSignIn,
  isBusinessOwner,
  deleteBusinessById
);

// Update business opening hours by the owner
router.put(
  "/update-opening-hours/:businessId",
  requireSignIn,
  isBusinessOwner,
  updateBusinessOpeningHours
);

// Update business location by the owner
router.put(
  "/update-location/:businessId",
  requireSignIn,
  isBusinessOwner,
  updateBusinessLocation
);

// Update business category by the owner
router.put(
  "/update-category/:businessId",
  requireSignIn,
  isBusinessOwner,
  updateBusinessCategory
);

module.exports = router;
