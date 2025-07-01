const mongoose = require("mongoose");

const stockSchema = new mongoose.Schema({
  name: { type: String, required: true },
  quantity: { type: Number, required: true },
  unit: { type: String, required: false },
  unitPrice: { type: Number, required: true },
});

module.exports = mongoose.model("StockItem", stockSchema);
