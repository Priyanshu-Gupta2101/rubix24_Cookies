const bcrypt = require("bcrypt");
const User = require("../models/userModel");
const { v4: uuidv4 } = require("uuid");
const crypto = require("crypto");

const hashPassword = async (password) => {
  try {
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  } catch (error) {
    throw error;
  }
};

const comparePassword = async (password, hashedPassword) => {
  try {
    return await bcrypt.compare(password, hashedPassword);
  } catch (error) {
    throw error;
  }
};

const verifyEmailController = async (req, res) => {
  try {
    const { email, code } = req.params;

    const user = await User.findOne({
      email,
      emailVerificationCode: code,
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid verification code",
      });
    }

    // Mark the email as verified
    user.isEmailVerified = true;
    user.emailVerificationCode = null; // Optional: clear the verification code after successful verification
    await user.save();

    res.status(200).json({
      success: true,
      message: "Email verification successful.",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error in email verification",
      error,
    });
  }
};

const generateVerificationCode = (id) => {
  return uuidv4().split("-").join("").substr(0, 4);
};

const generateSecretKey = () => {
  const jwtSecretKey = process.env.JWT_SECRET;
  const masterAdminSecretKey = process.env.MASTER_ADMIN_SECRET;

  if (!jwtSecretKey) {
    console.warn(
      "JWT_SECRET environment variable is not set. Generating a random key."
    );
    console.log(crypto.randomBytes(32).toString("hex"));
  }

  if (!masterAdminSecretKey) {
    console.warn(
      "MASTER_ADMIN_SECRET environment variable is not set. Generating a random key."
    );
    console.log(crypto.randomBytes(32).toString("hex"));
  }
};

module.exports = {
  hashPassword,
  comparePassword,
  verifyEmailController,
  generateVerificationCode,
  generateSecretKey,
};
