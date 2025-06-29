const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  role: String, // 'admin', 'manager', 'staff'
});
module.exports = mongoose.model("User", userSchema);             