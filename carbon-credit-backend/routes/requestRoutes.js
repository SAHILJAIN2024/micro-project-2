const express = require("express");
const multer = require("multer");
const path = require("path");
const Request = require("../models/Request");

const router = express.Router();

// Multer config for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Ensure this folder exists
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

/**
 * POST /api/requests
 * Submits a new mint/burn request
 */
router.post("/", upload.single("file"), async (req, res) => {
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
    console.error("Error submitting request:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});


/**
 * GET /api/requests
 * Fetches all pending requests
 */
router.get("/", async (req, res) => {
  try {
    const pendingRequests = await Request.find({ status: "pending" }).sort({ createdAt: -1 });
    res.status(200).json(pendingRequests);
  } catch (error) {
    console.error("Error fetching requests:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

/**
 * POST /api/requests/:id/approve
 * Approves a request and deletes it from DB
 */
router.post("/:id/approve", async (req, res) => {
  try {
    const request = await Request.findById(req.params.id);
    if (!request) return res.status(404).json({ message: "Request not found" });

    // Optionally: Perform token minting logic here

    await Request.findByIdAndDelete(req.params.id); // Delete after approval
    res.status(200).json({ message: "Request approved and deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/**
 * POST /api/requests/:id/reject
 * Rejects a request and deletes it from DB
 */
router.post("/:id/reject", async (req, res) => {
  try {
    const request = await Request.findById(req.params.id);
    if (!request) return res.status(404).json({ message: "Request not found" });

    await Request.findByIdAndDelete(req.params.id); // Delete after rejection
    res.status(200).json({ message: "Request rejected and deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
