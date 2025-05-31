const express = require("express");
const router = express.Router();
const Transaction = require("../models/Transaction");

// POST /api/transactions
router.post("/", async (req, res) => {
  try {
    const newTx = new Transaction(req.body);
    await newTx.save();
    res.status(201).json(newTx);
  } catch (err) {
    console.error("Error saving transaction:", err.message);
    res.status(500).json({ message: "Server error" });
  }
});

// GET /api/transactions/:wallet
router.get("/:wallet", async (req, res) => {
  try {
    const transactions = await Transaction.find({
      $or: [{ sender: req.params.wallet }, { receiver: req.params.wallet }],
    }).sort({ createdAt: -1 });

    res.json(transactions);
  } catch (err) {
    console.error("Error fetching transactions:", err.message);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
