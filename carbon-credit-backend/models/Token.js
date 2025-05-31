const mongoose = require("mongoose");

const tokenSchema = new mongoose.Schema(
  {
    totalMinted: Number,
    totalBurned: Number,
  },
  { timestamps: true }
);

module.exports = mongoose.models.Token || mongoose.model("Token", tokenSchema);
