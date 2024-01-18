const mongoose = require("mongoose");

const documentSchema = new mongoose.Schema({
  businessId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Business",
    required: true,
  },
  documentType: {
    type: String,
    enum: ["UtilityBill", "BankStatement", "BusinessLicense"],
    required: true,
  },
  documentName: { type: String, required: true },
  documentFile: { type: String, required: true },
  uploadDate: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Document", documentSchema);
