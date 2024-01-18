// routes/personalEmergencyContactRoutes.js
const express = require("express");
const {
  createPersonalEmergencyContact,
  getAllEmergencyContacts,
  updatePersonalEmergencyContactById,
  deletePersonalEmergencyContactById,
  verifyEmergencyContact,
  sendSOSMessage,
} = require("../controllers/emergencyController");

const { requireSignIn } = require("../middleware/authMiddleware");

const router = express.Router();

// Create a new personal emergency contact
router.post("/sos/create", requireSignIn, createPersonalEmergencyContact);

// Get all personal emergency contacts
router.get("/sos/all", requireSignIn, getAllEmergencyContacts);

// Update a personal emergency contact by ID
router.put(
  "/sos/update/:contactId",
  requireSignIn,
  updatePersonalEmergencyContactById
);

// Delete a personal emergency contact by ID
router.delete(
  "/sos/delete/:contactId",
  requireSignIn,
  deletePersonalEmergencyContactById
);

// Send an SOS message
router.post("/send-sos", requireSignIn, sendSOSMessage);

//Phone number Verification
router.post("/verify-phone/:phone/:code", verifyEmergencyContact);

module.exports = router;
