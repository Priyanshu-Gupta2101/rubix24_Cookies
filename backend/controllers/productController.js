const Product = require("../models/productModel.js");
const uploadImage = require("../utils/uploadImages.js");

// Controller to create a new product
const createProduct = async (req, res) => {
  try {
    const { name, description, price, images } = req.body;

    const newProduct = new Product({
      name,
      description,
      price,
    });

    const uploads = images.map((base) => uploadImage(base));

    Promise.all(uploads)
      .then((val) => resolve(val))
      .then((val) => {
        newProduct.images = val;
      });

    const savedProduct = await newProduct.save();

    res.status(201).json(savedProduct);
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Controller to get all products
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();

    res.status(200).json(products);
  } catch (error) {
    console.error("Error getting products:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Controller to get a single product by ID
const getProductById = async (req, res) => {
  try {
    const { productId } = req.params;

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.status(200).json(product);
  } catch (error) {
    console.error("Error getting product by ID:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Controller to update a product by ID
const updateProductById = async (req, res) => {
  try {
    const { productId } = req.params;

    const updateData = req.body;

    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      updateData,
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.status(200).json(updatedProduct);
  } catch (error) {
    console.error("Error updating product by ID:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Controller to delete a product by ID
const deleteProductById = async (req, res) => {
  try {
    const { productId } = req.params;

    const deletedProduct = await Product.findByIdAndDelete(productId);

    if (!deletedProduct) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.status(204).send();
  } catch (error) {
    console.error("Error deleting product by ID:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProductById,
  deleteProductById,
};
