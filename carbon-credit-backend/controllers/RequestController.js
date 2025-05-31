const Request = require("../models/Request");
const path = require("path");

// Create new request
const createRequest = async (req, res) => {
  try {
    const { type, address, amount, notes } = req.body;

    if (!type || !address || !amount) {
      return res.status(400).json({ error: "Type, address, and amount are required." });
    }

    const newRequest = new Request({
      type,
      address,
      amount: parseFloat(amount),
      notes: notes || "",
      fileUrl: req.file ? `/uploads/${req.file.filename}` : null,
      status: "pending",
      createdAt: new Date(),
    });

    await newRequest.save();

    res.status(201).json({ message: "Request submitted successfully", request: newRequest });
  } catch (error) {
    console.error("Error creating request:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Get all pending requests
const getPendingRequests = async (req, res) => {
  try {
    const requests = await Request.find({ status: "pending" }).sort({ createdAt: -1 });
    res.status(200).json(requests);
  } catch (error) {
    console.error("Error fetching requests:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Approve request
const approveRequest = async (req, res) => {
  try {
    const request = await Request.findById(req.params.id);
    if (!request) return res.status(404).json({ message: "Request not found" });

    // Smart contract logic for minting could go here

    await Request.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Request approved and deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Reject request
const rejectRequest = async (req, res) => {
  try {
    const request = await Request.findById(req.params.id);
    if (!request) return res.status(404).json({ message: "Request not found" });

    await Request.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Request rejected and deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  createRequest,
  getPendingRequests,
  approveRequest,
  rejectRequest,
};
