const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema(
  {
    from: { type: String, required: true },
    to: { type: String, required: true },
    amount: { type: Number, required: true },
    txHash: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.models.Transaction || mongoose.model("Transaction", transactionSchema);
