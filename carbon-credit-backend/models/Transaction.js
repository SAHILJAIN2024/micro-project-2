const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema(
  {
    from: { type: String, required: true },
    to: { type: String, required: true },
    amount: { type: Number, required: true },
    txHash: { type: String }, // optional
  },
  { timestamps: true } // adds createdAt and updatedAt
);

module.exports = mongoose.models.Transaction || mongoose.model("Transaction", transactionSchema);
