const mongoose = require("mongoose");

const CommunityPostSchema = new mongoose.Schema({
  title: String,
  description: String,
  type: {
    type: String,
    enum: ["buy", "sell"],
    required: true,
  },
  amount: Number,
  wallet: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("CommunityPost", CommunityPostSchema);
