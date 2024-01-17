const express = require("express");
const {
  registerController,
  loginController,
  forgotPasswordController,
  updateUserController,
  getUserProfile,
  userDeleteController,
  profileImage,
} = require("../controllers/authUserController.js");

const {
  getAllUsersController,
  adminUpdateUserController,
  adminForgotPasswordController,
  adminLoginController,
  adminRegister,
  getAllAdminsController,
  masterAdminLoginController,
  getUserProfileByAdmin,
  adminDeleteController,
} = require("../controllers/authAdminController.js");
const {
  isAdmin,
  requireSignIn,
  requireMasterAdminToken,
} = require("../middleware/authMiddleware.js");
const { verifyEmailController } = require("../helpers/authHelper.js");
const upload = require("../utils/multer.js");

//router object
const router = express.Router();

//routing
//REGISTER || METHOD POST
router.post("/register", registerController);

//LOGIN || POST
router.post("/login", loginController);

//Forgot Password || POST
router.post("/forgot-password", forgotPasswordController);

//Update || PUT
router.put("/update", requireSignIn, updateUserController);

// Delete User || DELETE
router.delete("/delete-user", requireSignIn, userDeleteController);

//protected User route auth
router.get("/user-auth", requireSignIn, (req, res) => {
  res.status(200).json({ ok: true });
});

router.get("/profile", requireSignIn, getUserProfile);

//protected Admin route auth
router.get("/admin-auth", requireSignIn, isAdmin, (req, res) => {
  res.status(200).json({ ok: true });
});

// Get All Admins || GET
router.get("/admin/all-admins", requireSignIn, isAdmin, getAllAdminsController);

// Admin Register || POST
router.post("/admin/register", requireMasterAdminToken, adminRegister);

// Admin Login || POST
router.post("/admin/login", adminLoginController);

// Admin Forgot Password || POST
router.post(
  "/admin/forgot-password",
  requireMasterAdminToken,
  adminForgotPasswordController
);

router.get("/users", requireSignIn, isAdmin, getAllUsersController);

router.get(
  "/admin/get-user-profile",
  requireSignIn,
  isAdmin,
  getUserProfileByAdmin
);

// Admin Update User || PUT
router.put(
  "/admin/update-user/:userId",
  requireSignIn,
  isAdmin,
  adminUpdateUserController
);

// Admin Delete User || DELETE
router.delete(
  "/admin/delete-user/:userId",
  requireSignIn,
  isAdmin,
  userDeleteController
);

//Verification
router.post("/verify-email/:email/:code", verifyEmailController);

router.post(
  "/profile-image",
  requireSignIn,
  upload.single("file"),
  profileImage
);

// Master Admin Login Route
router.post("/master-admin/login", masterAdminLoginController);

router.delete(
  "/admin/delete-admin",
  requireSignIn,
  isAdmin,
  requireMasterAdminToken,
  adminDeleteController
);

module.exports = router;
