// models/Profile.js
const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
  wallet: { type: String, required: true, unique: true },
  name: String,
  email: String,
  organization: String,
  country: String,
  specialization: String
});

module.exports = mongoose.models.Profile || mongoose.model('Profile', ProfileSchema);
