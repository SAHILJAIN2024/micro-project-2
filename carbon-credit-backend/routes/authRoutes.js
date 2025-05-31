const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

router.post("/login", async (req, res) => {
  const { wallet } = req.body;

  if (!wallet) {
    return res.status(400).json({ message: "Wallet address is required" });
  }

  try {
    // Create a token with wallet address as payload
    const token = jwt.sign({ wallet }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.status(200).json({ token });
  } catch (err) {
    console.error("Login error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
