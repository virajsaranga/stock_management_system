const mongoose = require("mongoose");

const procurementSchema = new mongoose.Schema({
  item: { type: String, required: true },
  quantity: { type: Number, required: true },
  status: { type: String, default: "pending" },
  createdAt: { type: Date, default: Date.now }
});

const Procurement = mongoose.model("Procurement", procurementSchema);

module.exports = Procurement;

