const Procurement = require("../models/Procurement");

exports.getAllProcurements = async (req, res) => {
  const result = await Procurement.find({ isDeleted: false }).populate("items.stockItem");
  res.json(result);
};

exports.createProcurement = async (req, res) => {
  const { reference, date, items } = req.body;
  const procurement = new Procurement({ reference, date, items });
  await procurement.save();
  res.status(201).json(procurement);
};

exports.updateProcurement = async (req, res) => {
  const updated = await Procurement.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
};

exports.softDeleteProcurement = async (req, res) => {
  await Procurement.findByIdAndUpdate(req.params.id, { isDeleted: true });
  res.send("Procurement soft-deleted");
};
