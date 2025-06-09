const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const User = require("../models/User");

router.post("/login", async (req, res) => {
  const { wallet, email } = req.body;

  if (!wallet || !email) {
    return res.status(400).json({ message: "Wallet and email are required" });
  }

  try {
    let user = await User.findOne({ wallet });

    if (!user) {
      // Auto-assign role based on email or default to 'user'
      const role = email.endsWith("@authority.com") ? "authority" : "user";

      user = new User({ wallet, email, role });
      await user.save();
    } else {
      if (user.email !== email) {
        user.email = email;
        await user.save();
      }
    }

    const token = jwt.sign({ wallet, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: "1d"
    });

    return res.status(200).json({
      token,
      role: user.role
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
