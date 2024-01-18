const EmergencyContact = require("../models/emergencyModel.js");
const {
  generateVerificationCode,
  sendVerificationCodeOnPhone,
} = require("../helpers/authHelper.js");
const twilio = require("twilio");
require("dotenv").config();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_ACCOUNT_TOKEN;
const twilioClient = twilio(accountSid, authToken);

// Controller to create a new personal emergency contact
const createPersonalEmergencyContact = async (req, res) => {
  try {
    const { name, relationship, phone } = req.body;

    const verificationCode = generateVerificationCode();

    const newPersonalContact = new EmergencyContact({
      type: "Personal",
      name,
      relationship,
      phone,
      isVerified: false,
      verificationCode: verificationCode,
    });

    await sendVerificationCodeOnPhone(phone, verificationCode);

    const savedContact = await newPersonalContact.save();

    res.status(201).json(savedContact);
  } catch (error) {
    console.error("Error creating personal emergency contact:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Controller to get all personal emergency contacts
const getAllEmergencyContacts = async (req, res) => {
  try {
    const personalContacts = await EmergencyContact.find();

    res.status(200).json(personalContacts);
  } catch (error) {
    console.error("Error getting personal emergency contacts:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Controller to update a personal emergency contact by ID
const updatePersonalEmergencyContactById = async (req, res) => {
  try {
    const { contactId } = req.params;
    const updateData = req.body;

    const updatedPersonalContact = await EmergencyContact.findByIdAndUpdate(
      contactId,
      { ...updateData, type: "Personal" },
      { new: true }
    );

    if (!updatedPersonalContact) {
      return res.status(404).json({ error: "Personal contact not found" });
    }

    res.status(200).json(updatedPersonalContact);
  } catch (error) {
    console.error("Error updating personal emergency contact by ID:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Controller to delete a personal emergency contact by ID
const deletePersonalEmergencyContactById = async (req, res) => {
  try {
    const { contactId } = req.params;

    const deletedPersonalContact = await EmergencyContact.findByIdAndDelete(
      contactId
    );

    if (!deletedPersonalContact) {
      return res.status(404).json({ error: "Personal contact not found" });
    }

    res.status(204).send();
  } catch (error) {
    console.error("Error deleting personal emergency contact by ID:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Controller to create sos request and send to the emergency contacts
const sendSOSMessage = async (req, res) => {
  try {
    const { phoneNumber, message } = req.body;

    // Send an emergency SOS message via SMS
    await twilioClient.messages.create({
      to: phoneNumber,
      from: process.env.PHONE,
      body: `EMERGENCY: ${message}`,
    });

    res.status(200).json({ success: true });
  } catch (error) {
    console.error("Error sending SOS message:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const verifyEmergencyContact = async (req, res) => {
  try {
    const { phone, code } = req.params;

    const emergencyContact = await EmergencyContact.findOne({
      phone: phone,
      verificationCode: code,
    });

    if (!emergencyContact) {
      return res.status(400).json({
        success: false,
        message: "Invalid verification code",
      });
    }

    emergencyContact.isVerified = true;
    emergencyContact.verificationCode = null;
    await emergencyContact.save();

    res.status(200).json({
      success: true,
      message: "Emergency contact verification successful.",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error in emergency contact verification",
      error,
    });
  }
};

module.exports = {
  createPersonalEmergencyContact,
  getAllEmergencyContacts,
  updatePersonalEmergencyContactById,
  deletePersonalEmergencyContactById,
  sendSOSMessage,
  verifyEmergencyContact,
};
