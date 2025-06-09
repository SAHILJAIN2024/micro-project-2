const mongoose = require("mongoose");

const RequestSchema = new mongoose.Schema(
  {
    wallet: { type: String, required: true },
    reason: { type: String },
    amount: { type: Number, required: true },
    status: { type: String, default: "pending" },
  },
  { timestamps: true }
);

module.exports = mongoose.models.Request || mongoose.model("Request", RequestSchema);

// const mongoose = require('mongoose');

// const RequestSchema = new mongoose.Schema({
//   wallet: { type: String, required: true },
//     reason: { type: String },
//     amount: { type: Number },
//     status: { type: String, default: "pending" },
//   },
//   { timestamps: true
// });

// // ✅ Prevent OverwriteModelError
// module.exports = mongoose.models.Request || mongoose.model('Request', RequestSchema);
