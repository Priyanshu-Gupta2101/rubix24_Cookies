const JWT = require("jsonwebtoken");
const User = require("../models/userModel.js");

//Protected Routes token base
const requireSignIn = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Authorization token missing",
      });
    }
    const decode = JWT.verify(
      req.headers.authorization.split(" ")[1],
      process.env.JWT_SECRET
    );
    req.user = decode;
    next();
  } catch (error) {
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({
        success: false,
        message: "Invalid token",
      });
    }

    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

//admin acceess
const isAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user || user.role !== "Admin") {
      return res.status(401).json({
        success: false,
        message: "UnAuthorized Access",
      });
    } else {
      next();
    }
  } catch (error) {
    console.log(error);
    res.status(501).json({
      success: false,
      error,
      message: "Error in admin middelware",
    });
  }
};

const requireMasterAdminToken = async (req, res, next) => {
  const masterAdminToken = req.headers.masteradmintoken;
  // Verify the master admin token

  if (!masterAdminToken) {
    return res.status(401).json({
      success: false,
      message: "Master Admin token missing",
    });
  }
  try {
    const decoded = JWT.verify(
      masterAdminToken,
      process.env.MASTER_ADMIN_SECRET
    );

    const masterAdmin = await User.findById(decoded._id);
    if (masterAdmin.role === "MasterAdmin") {
      next();
    } else {
      res.status(401).json({ success: false, message: "Unauthorized" });
    }
  } catch (error) {
    res.status(401).json({ success: false, message: "Unauthorized" });
  }
};

module.exports = { requireSignIn, isAdmin, requireMasterAdminToken };
