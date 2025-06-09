const express = require("express");
const router = express.Router();
const Transaction = require("../models/Transaction");

// POST /api/transactions — Log a new transaction
router.post("/", async (req, res) => {
  try {
    const { from, to, amount, txHash } = req.body;

    if (!from || !to || !amount) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const newTx = new Transaction({ from, to, amount, txHash });
    await newTx.save();
    res.status(201).json(newTx);
  } catch (err) {
    console.error("Error saving transaction:", err.message);
    res.status(500).json({ message: "Server error" });
  }
});

// GET /api/transactions/:wallet — Fetch all transactions for a wallet
router.get("/:wallet", async (req, res) => {
  try {
    const wallet = req.params.wallet.toLowerCase();

    const transactions = await Transaction.find({
      $or: [{ from: wallet }, { to: wallet }],
    }).sort({ createdAt: -1 });

    res.json(transactions);
  } catch (err) {
    console.error("Error fetching transactions:", err.message);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
