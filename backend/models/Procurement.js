const mongoose = require("mongoose");

const procurementSchema = new mongoose.Schema({
  reference: { type: String, required: true },
  date: { type: Date, default: Date.now },
  items: [
    {
      stockItem: { type: mongoose.Schema.Types.ObjectId, ref: "StockItem", required: true },
      quantity: { type: Number, required: true },
      price: { type: Number, required: true }
    }
  ],
  isDeleted: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

const Procurement = mongoose.model("Procurement", procurementSchema);
module.exports = Procurement;

