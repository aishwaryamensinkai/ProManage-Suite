// User.js
const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  valueEarned: { type: Number, default: 0 },
});

module.exports = mongoose.model("User", UserSchema);
