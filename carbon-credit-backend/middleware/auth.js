const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const User = require("../models/User");

router.post("/login", async (req, res) => {
  const { wallet, email } = req.body;

  if (!wallet || !email) {
    return res.status(400).json({ message: "Wallet and email are required" });
  }

  try {
    let user = await User.findOne({ wallet });

    if (!user) {
      // 🚨 Default to role: 'user' or use logic based on email/domain
      const role = email.endsWith("@authority.com") ? "authority" : "user";

      user = new User({ wallet, email, role });
      await user.save();
    }

    const token = jwt.sign(
      { wallet, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(200).json({
      token,
      role: user.role,
    });
  } catch (err) {
    console.error("Login Error:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;



// const jwt = require("jsonwebtoken");

// const verifyToken = (req, res, next) => {
//   const authHeader = req.headers.authorization;
//   if (!authHeader || !authHeader.startsWith("Bearer ")) {
//     return res.status(401).json({ message: "No token provided" });
//   }

//   const token = authHeader.split(" ")[1];

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = decoded; // attach wallet info to request
//     next();
//   } catch (err) {
//     return res.status(401).json({ message: "Invalid token" });
//   }
// };

// module.exports = verifyToken;
