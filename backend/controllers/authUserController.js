const User = require("../models/userModel.js");
const {
  comparePassword,
  hashPassword,
  generateVerificationCode,
} = require("../helpers/authHelper.js");
const JWT = require("jsonwebtoken");
const cloudinary = require("../utils/cloudinary.js");
const sendVerificationCode = require("../utils/nodemailer.js");
const DatauriParser = require("datauri/parser.js");
const path = require("path");

const registerController = async (req, res) => {
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
    const user = new User({
      name,
      email,
      phone,
      password: hashedPassword,
      emailVerificationCode: verificationCode,
    });

    // Send the verification code via email
    await sendVerificationCode(email, verificationCode);

    await user.save();

    res.status(200).json({
      success: true,
      message: "User Register Successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error in Registeration",
      error,
    });
  }
};

//POST LOGIN

const loginController = async (req, res) => {
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

    // Check if the email is verified
    if (!user.isEmailVerified) {
      return res.status(401).json({
        success: false,
        message: "Email is not verified. Please verify your email first.",
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
      expiresIn: "7d",
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
    res.status(500).json({
      success: false,
      message: "Error in login",
      error,
    });
  }
};

//forgotPasswordController

const forgotPasswordController = async (req, res) => {
  try {
    const { email, newPassword } = req.body;
    if (!email) {
      res.status(404).json({ message: "Email is required" });
    }

    const user = await User.findOne({ email });

    //validation
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Wrong Email",
      });
    }

    if (!user.isEmailVerified) {
      return res.status(401).json({ message: "Email is not verified" });
    }

    if (newPassword && newPassword.length < 6) {
      return res.status(404).json({
        error: "Passsword is required and password should be 6 character long",
      });
    }

    const hashed = await hashPassword(newPassword);
    const verificationCode = generateVerificationCode();
    await User.findByIdAndUpdate(user._id, {
      password: hashed,
      isEmailVerified: false,
      emailVerificationCode: verificationCode,
    });

    // Send the verification code via email
    await sendVerificationCode(email, verificationCode);

    res.status(200).json({
      success: true,
      message: "Password Reset Successfully. Verify your email",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error,
    });
  }
};

// updateUserController.js

const updateUserController = async (req, res) => {
  try {
    const { name, phone } = req.body;

    // Find the user by ID
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Update user properties
    if (name) {
      user.name = name;
    }
    if (phone) {
      user.phone = phone;
    }

    // Save the updated user
    await user.save();

    res.status(200).json({
      success: true,
      message: "User updated successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error in updating user",
      error,
    });
  }
};

const userDeleteController = async (req, res) => {
  try {
    const userIdToDelete = req.user._id;

    const deletedUser = await User.findById(userIdToDelete);

    if (!deletedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (deletedUser.photo && deletedUser.photo.public_id) {
      await cloudinary.uploader.destroy(deletedUser.photo.public_id);
    }

    await User.deleteOne({ _id: userIdToDelete });

    res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error in deleting user",
      error: error.message,
    });
  }
};

//get user
const getUserProfile = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

const profileImage = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId);
    const parser = new DatauriParser();

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    if (!req.file) {
      return res
        .status(400)
        .json({ success: false, message: "No image uploaded" });
    }

    if (req.file.size > 5000000) {
      return res
        .status(400)
        .json({ success: false, message: "File size is too large" });
    }

    if (user.photo && user.photo.public_id) {
      await cloudinary.uploader.destroy(`${user.photo.public_id}`, {
        invalidate: true,
      });
    }

    const image = parser.format(
      path.extname(req.file.originalname).toString(),
      req.file.buffer
    ).content;

    const result = await cloudinary.uploader.upload(
      image,
      {
        folder: "profiles",
        public_id: Date.now(),
        resource_type: "image",
      },
      (err, image) => {
        if (err) {
          console.warn("------------------- ERROR: " + err);
        }
        console.log(
          "* public_id for the uploaded image is generated by Cloudinary's service."
        );
        console.log("* " + image.public_id);
        console.log("* " + image.url);
      }
    );

    console.log(result);

    user.photo = {
      public_id: result.public_id,
      url: result.secure_url,
    };

    await user.save();

    res.status(200).json({ success: true, message: "Profile Image Uploaded" });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, message: "Internal server error", error });
  }
};

module.exports = {
  registerController,
  loginController,
  getUserProfile,
  updateUserController,
  userDeleteController,
  forgotPasswordController,
  profileImage,
};
