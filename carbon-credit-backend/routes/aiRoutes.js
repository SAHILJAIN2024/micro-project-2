const express = require("express");
const router = express.Router();

router.post("/predict", async (req, res) => {
  try {
    const fetch = global.fetch || (await import("node-fetch")).default; // for older Node versions

    const response = await fetch("http://localhost:8000/predict", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req.body),
    });

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("AI prediction failed:", error.message);
    res.status(500).json({ message: "AI prediction failed" });
  }
});

module.exports = router;
