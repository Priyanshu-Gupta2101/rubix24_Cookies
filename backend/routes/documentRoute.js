const express = require("express");
const {
  createDocument,
  getDocumentsByBusiness,
  getDocumentById,
  updateDocumentById,
  deleteDocumentById,
} = require("../controllers/documentController");
const { requireSignIn } = require("../middleware/authMiddleware");
const upload = require("../utils/multer");

const router = express.Router();

// Create a new document
router.post("/create", requireSignIn, createDocument);

// Get all documents for a business
router.get("/all/:businessId", requireSignIn, getDocumentsByBusiness);

// Get a single document by ID
router.get("/get/:documentId", requireSignIn, getDocumentById);

// Update a document by ID
router.put(
  "/update/:documentId",
  requireSignIn,
  upload.single("file"),
  updateDocumentById
);

// Delete a document by ID
router.delete("/delete/:documentId", requireSignIn, deleteDocumentById);

module.exports = router;
