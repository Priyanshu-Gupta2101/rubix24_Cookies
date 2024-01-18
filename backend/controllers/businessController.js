const Business = require("../models/businessModel.js");
const User = require("../models/userModel.js");

const verifyBusiness = async (businessId) => {
  try {
    const updatedBusiness = await Business.findByIdAndUpdate(
      businessId,
      { verified: true },
      { new: true }
    );

    if (!updatedBusiness) {
      throw new Error("Business not found");
    }
    return updatedBusiness;
  } catch (error) {
    console.error(
      "Error updating business verification status:",
      error.message
    );
    throw error;
  }
};

// Controller to create a new business
const createBusiness = async (req, res) => {
  try {
    const {
      name,
      category,
      location,
      address,
      phone,
      website,
      description,
      openingHours,
      images,
      categories,
      tags,
      services,
    } = req.body;

    const userId = req.user._id;

    if (!userId) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    const newBusiness = new Business({
      name,
      category,
      location,
      address,
      phone,
      website,
      description,
      openingHours,
      adminUserId: userId,
      images,
      categories,
      tags,
      services,
    });

    const savedBusiness = await newBusiness.save();

    res.status(201).json(savedBusiness);
  } catch (error) {
    console.error("Error creating business:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getAllBusinesses = async (req, res) => {
  try {
    const businesses = await Business.find();

    res.status(200).json(businesses);
  } catch (error) {
    console.error("Error getting businesses:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getBusinessById = async (req, res) => {
  try {
    const { businessId } = req.params;
    const business = await Business.findById(businessId);

    if (!business) {
      return res.status(404).json({ error: "Business not found" });
    }

    res.status(200).json(business);
  } catch (error) {
    console.error("Error getting business by ID:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getBusinessByUserId = async (req, res) => {
  try {
    const userId = req.user._id;
    const business = await Business.find({ adminUserId: userId });

    if (!business) {
      return res.status(404).json({ error: "Business not found" });
    }

    res.status(200).json(business);
  } catch (error) {
    console.error("Error getting business by ID:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const updateBusinessById = async (req, res) => {
  try {
    const { businessId } = req.params;

    const updateData = req.body;

    const updatedBusiness = await Business.findByIdAndUpdate(
      businessId,
      updateData,
      { new: true }
    );

    if (!updatedBusiness) {
      return res.status(404).json({ error: "Business not found" });
    }

    res.status(200).json(updatedBusiness);
  } catch (error) {
    console.error("Error updating business by ID:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const deleteBusinessById = async (req, res) => {
  try {
    const { businessId } = req.params;

    const deletedBusiness = await Business.findByIdAndDelete(businessId);

    if (!deletedBusiness) {
      return res.status(404).json({ error: "Business not found" });
    }

    res.status(204).send();
  } catch (error) {
    console.error("Error deleting business by ID:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Controller to update business opening hours by the owner
const updateBusinessOpeningHours = async (req, res) => {
  try {
    const { businessId } = req.params;
    const { openingHours } = req.body;

    const updatedBusiness = await Business.findByIdAndUpdate(
      businessId,
      { openingHours },
      { new: true }
    );

    if (!updatedBusiness) {
      return res.status(404).json({ error: "Business not found" });
    }

    res.status(200).json(updatedBusiness);
  } catch (error) {
    console.error("Error updating business opening hours:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Controller to update business location by the owner
const updateBusinessLocation = async (req, res) => {
  try {
    const { businessId } = req.params;
    const { location } = req.body;

    const updatedBusiness = await Business.findByIdAndUpdate(
      businessId,
      { location },
      { new: true }
    );

    if (!updatedBusiness) {
      return res.status(404).json({ error: "Business not found" });
    }

    res.status(200).json(updatedBusiness);
  } catch (error) {
    console.error("Error updating business location:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Controller to update business category by the owner
const updateBusinessCategory = async (req, res) => {
  try {
    const { businessId } = req.params;
    const { category } = req.body;

    const updatedBusiness = await Business.findByIdAndUpdate(
      businessId,
      { category },
      { new: true }
    );

    if (!updatedBusiness) {
      return res.status(404).json({ error: "Business not found" });
    }

    res.status(200).json(updatedBusiness);
  } catch (error) {
    console.error("Error updating business category:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  createBusiness,
  getAllBusinesses,
  getBusinessById,
  updateBusinessById,
  deleteBusinessById,
  updateBusinessOpeningHours,
  updateBusinessLocation,
  updateBusinessCategory,
};
