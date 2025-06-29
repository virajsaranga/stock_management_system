const StockItem = require("../models/StockItem");

exports.getAllStock = async (req, res) => {
  const stocks = await StockItem.find();
  res.json(stocks);
};

exports.createStock = async (req, res) => {
  const { name, code, quantity, unitPrice } = req.body;
  const stock = new StockItem({ name, code, quantity, unitPrice });
  await stock.save();
  res.status(201).json(stock);
};

exports.updateStock = async (req, res) => {
  const stock = await StockItem.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(stock);
};

exports.deleteStock = async (req, res) => {
  await StockItem.findByIdAndDelete(req.params.id);
  res.send("Stock item deleted");
};
