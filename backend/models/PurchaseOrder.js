const mongoose = require("mongoose");

const poSchema = new mongoose.Schema({
  item: { type: String, required: true },
  quantity: { type: Number, required: true },
  supplier: { type: String, required: true },
  status: { type: String, default: "pending" },
  createdAt: { type: Date, default: Date.now }
});

const PurchaseOrder = mongoose.model("PurchaseOrder", poSchema);

module.exports = PurchaseOrder;
