const express = require("express");
const router = express.Router();
const Profile = require("../models/Profile");

// GET /api/profile/:wallet
router.get("/:wallet", async (req, res) => {
  try {
    const { wallet } = req.params;
    let profile = await Profile.findOne({ wallet });

    if (!profile) {
      profile = new Profile({ wallet });
      await profile.save();
    }

    res.json(profile);
  } catch (err) {
    console.error("Error fetching profile:", err.message);
    res.status(500).json({ message: "Server error" });
  }
});

// PUT /api/profile/:wallet
router.put("/:wallet", async (req, res) => {
  try {
    const { wallet } = req.params;
    const { name, email } = req.body;

    let profile = await Profile.findOne({ wallet });

    if (!profile) {
      profile = new Profile({ wallet, name, email });
    } else {
      profile.name = name;
      profile.email = email;
    }

    await profile.save();
    res.json(profile);
  } catch (err) {
    console.error("Error updating profile:", err.message);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
