const express = require("express");
const {
  createProduct,
  getAllProducts,
  getProductById,
  updateProductById,
  deleteProductById,
} = require("../controllers/productController");
const { requireSignIn, isAdmin } = require("../middleware/authMiddleware");

const router = express.Router();

// Create a new product
router.post("/create", requireSignIn, isAdmin, createProduct);

// Get all products
router.get("/all", getAllProducts);

// Get a single product by ID
router.get("/get/:productId", getProductById);

// Update a product by ID
router.put("/update/:productId", requireSignIn, isAdmin, updateProductById);

// Delete a product by ID
router.delete("/delete/:productId", requireSignIn, isAdmin, deleteProductById);

module.exports = router;
