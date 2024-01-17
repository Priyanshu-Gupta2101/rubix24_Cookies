const User = require("../models/userModel.js");
const {
  comparePassword,
  hashPassword,
  generateVerificationCode,
} = require("../helpers/authHelper.js");
const JWT = require("jsonwebtoken");
const sendVerificationCode = require("../utils/nodemailer.js");

const getAllUsersController = async (req, res) => {
  try {
    const users = await User.find({ role: "User" });

    res.status(200).json({
      success: true,
      userTot: users.length,
      message: "All Users",
      users,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Erorr in getting users",
      error: error.message,
    });
  }
};

const adminUpdateUserController = async (req, res) => {
  try {
    const { name, phone } = req.body;
    const userIdToUpdate = req.params.userId;

    const user = await User.findById(userIdToUpdate);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (user.role === "MasterAdmin" || user.role === "Admin") {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    if (name) user.name = name;
    if (phone) user.phone = phone;
    await user.save();

    res.status(200).json({
      success: true,
      message: "User updated successfully",
      user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error in updating user",
      error: error.message,
    });
  }
};

const getAllAdminsController = async (req, res) => {
  try {
    const users = await User.find({ role: "Admin" });

    res.status(200).json({
      success: true,
      userTot: users.length,
      message: "All Admin",
      users,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Erorr in getting users",
      error: error.message,
    });
  }
};

const adminRegister = async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;
    //validations
    if (!name) {
      return res.status(404).json({ error: "Name is Required" });
    }
    if (!email) {
      return res.status(404).json({ error: "Email is Required" });
    }
    if (!password) {
      return res.status(404).json({ error: "Password is Required" });
    }
    if (!phone) {
      return res.status(404).json({ error: "Phone no is Required" });
    }

    if (password && password.length < 6) {
      return res.status(400).json({
        success: false,
        error: "Passsword is required and 6 character long",
      });
    }

    //check user
    const exisitingUser = await User.findOne({ email });
    //exisiting user
    if (exisitingUser) {
      return res.status(400).json({
        success: false,
        error: "Already Register please login",
      });
    }
    //register user
    const hashedPassword = await hashPassword(password);
    const verificationCode = generateVerificationCode();

    //save
    const user = await new User({
      name,
      email,
      phone,
      password: hashedPassword,
      role: "Admin",
      emailVerificationCode: verificationCode,
    });

    await user.save();

    // Send verification code via email
    await sendVerificationCode(email, verificationCode);

    res.status(200).json({
      success: true,
      message: "Admin Register Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error in Registeration",
      error,
    });
  }
};

const adminLoginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    //validation
    if (!email || !password) {
      return res.status(404).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    //check user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Email is not registerd",
      });
    }

    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(404).json({
        success: false,
        message: "Invalid Password",
      });
    }

    //token
    const token = JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "2d",
    });

    res.status(200).json({
      success: true,
      message: "login successfully",
      user: {
        _id: user._id,
        name: user.name,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error in login",
      error,
    });
  }
};

const adminForgotPasswordController = async (req, res) => {
  try {
    const { email, newPassword } = req.body;

    if (!email || !newPassword) {
      return res.status(400).json({
        success: false,
        message: "Email, and new password are required",
      });
    }
    if (newPassword.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters long",
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Wrong email or answer",
      });
    }

    const hashedPassword = await hashPassword(newPassword);
    const verificationCode = generateVerificationCode();
    await User.findByIdAndUpdate(user._id, {
      password: hashedPassword,
      isEmailVerified: false,
      emailVerificationCode: verificationCode,
    });

    // Send the verification code via email
    await sendVerificationCode(email, verificationCode);

    res.status(200).json({
      success: true,
      message: "Password reset successfully. Verify your email",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error in forgot password",
      error: error.message,
    });
  }
};

// Master Admin Login Controller
const masterAdminLoginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(404).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    //check user
    const user = await User.findOne({ email, role: "MasterAdmin" });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Master Email is wrong",
      });
    }

    // const match = await comparePassword(password, user.password);
    if (password !== user.password) {
      return res.status(404).json({
        success: false,
        message: "Invalid Password",
      });
    }

    const token = JWT.sign({ _id: user._id }, process.env.MASTER_ADMIN_SECRET, {
      expiresIn: "1d",
    });

    res.status(200).json({
      success: true,
      message: "Master Admin login successful",
      token,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error in master admin login",
      error,
    });
  }
};

//get user
const getUserProfileByAdmin = async (req, res) => {
  try {
    const email = req.query.email;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

//delete admin
const adminDeleteController = async (req, res) => {
  try {
    const adminIdToDelete = req.user._id;

    const deletedAdmin = await User.findById(adminIdToDelete);

    if (!deletedAdmin) {
      return res.status(404).json({
        success: false,
        message: "Admin not found",
      });
    }

    if (deletedAdmin.photo && deletedAdmin.photo.public_id) {
      await cloudinary.uploader.destroy(deletedAdmin.photo.public_id);
    }

    await User.deleteOne({ _id: adminIdToDelete });

    res.status(200).json({
      success: true,
      message: "Admin deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error in deleting Admin",
      error: error.message,
    });
  }
};

module.exports = {
  adminForgotPasswordController,
  adminLoginController,
  adminRegister,
  adminUpdateUserController,
  getAllAdminsController,
  getAllUsersController,
  masterAdminLoginController,
  getUserProfileByAdmin,
  adminDeleteController,
};
