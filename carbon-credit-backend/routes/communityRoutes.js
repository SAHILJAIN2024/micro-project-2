const express = require("express");
const router = express.Router();
const CommunityPost = require("../models/CommunityPost");

// GET all posts
router.get("/", async (req, res) => {
  try {
    const posts = await CommunityPost.find().sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch posts" });
  }
});

// POST a new post
router.post("/", async (req, res) => {
  const { title, description, type, amount, wallet } = req.body;
  try {
    const newPost = new CommunityPost({ title, description, type, amount, wallet });
    await newPost.save();
    res.status(201).json(newPost);
  } catch (err) {
    res.status(400).json({ error: "Failed to create post" });
  }
});

module.exports = router;