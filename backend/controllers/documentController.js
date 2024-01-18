const Document = require("../models/documentModel");

// Controller to create a new document
const createDocument = async (req, res) => {
  try {
    const { businessId, documentType, documentName } = req.body;
    const documentFile = req.file.buffer.toString("base64"); // Convert to base64

    const newDocument = new Document({
      businessId,
      documentType,
      documentName,
      documentFile,
    });

    const savedDocument = await newDocument.save();

    res.status(201).json(savedDocument);
  } catch (error) {
    console.error("Error creating document:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Controller to get all documents for a business
const getDocumentsByBusiness = async (req, res) => {
  try {
    const { businessId } = req.params;

    const documents = await Document.find({ businessId });

    res.status(200).json(documents);
  } catch (error) {
    console.error("Error getting documents for business:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Controller to get a single document by ID
const getDocumentById = async (req, res) => {
  try {
    const { documentId } = req.params;

    const document = await Document.findById(documentId);

    if (!document) {
      return res.status(404).json({ error: "Document not found" });
    }

    res.status(200).json(document);
  } catch (error) {
    console.error("Error getting document by ID:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Controller to update a document by ID
const updateDocumentById = async (req, res) => {
  try {
    const { documentId } = req.params;
    const updateData = req.body;

    if (req.file) {
      // If a new file is uploaded, update the documentFile
      updateData.documentFile = req.file.buffer.toString("base64");
    }

    const updatedDocument = await Document.findByIdAndUpdate(
      documentId,
      updateData,
      { new: true }
    );

    if (!updatedDocument) {
      return res.status(404).json({ error: "Document not found" });
    }

    res.status(200).json(updatedDocument);
  } catch (error) {
    console.error("Error updating document by ID:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Controller to delete a document by ID
const deleteDocumentById = async (req, res) => {
  try {
    const { documentId } = req.params;

    const deletedDocument = await Document.findByIdAndDelete(documentId);

    if (!deletedDocument) {
      return res.status(404).json({ error: "Document not found" });
    }

    res.status(204).send();
  } catch (error) {
    console.error("Error deleting document by ID:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  createDocument,
  getDocumentsByBusiness,
  getDocumentById,
  updateDocumentById,
  deleteDocumentById,
};
