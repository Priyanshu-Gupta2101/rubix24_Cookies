const mongoose = require("mongoose");

const documentSchema = new mongoose.Schema({
  businessId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Business",
    required: true,
  },
  documentName: { type: String, required: true },
  documentFile: { type: String, required: true },
  uploadDate: { type: Date, default: Date.now },
});

const Document = mongoose.model("Document", documentSchema);

module.exports = Document;
