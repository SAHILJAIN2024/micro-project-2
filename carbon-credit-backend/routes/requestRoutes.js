const express = require("express");
const router = express.Router();
const Request = require("../models/Request");

// POST /api/requests
router.post("/", async (req, res) => {
  try {
    const newRequest = new Request(req.body);
    await newRequest.save();
    res.status(201).json(newRequest);
  } catch (err) {
    console.error("Error creating request:", err.message);
    res.status(500).json({ message: "Server error" });
  }
});

// GET all requests
router.get("/", async (req, res) => {
  try {
    const requests = await Request.find();
    res.json(requests);
  } catch (err) {
    console.error("Error fetching requests:", err.message);
    res.status(500).json({ message: "Server error" });
  }
});

// PUT /api/requests/:id/approve
router.put("/:id/approve", async (req, res) => {
  try {
    const updated = await Request.findByIdAndUpdate(
      req.params.id,
      { status: "approved" },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    console.error("Error approving request:", err.message);
    res.status(500).json({ message: "Server error" });
  }
});

// PUT /api/requests/:id/reject
router.put("/:id/reject", async (req, res) => {
  try {
    const updated = await Request.findByIdAndUpdate(
      req.params.id,
      { status: "rejected" },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    console.error("Error rejecting request:", err.message);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
