const Procurement = require("../models/Procurement");

exports.getAllProcurements = async (req, res) => {
  try {
    const result = await Procurement.find({ isDeleted: false }).populate("items.stockItem");
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: "Error fetching procurements" });
  }
};

exports.createProcurement = async (req, res) => {
  try {
    const { reference, date, items } = req.body;
    const procurement = new Procurement({ reference, date, items });
    await procurement.save();
    res.status(201).json(procurement);
  } catch (error) {
    res.status(500).json({ error: "Error creating procurement" });
  }
};

exports.updateProcurement = async (req, res) => {
  try {
    const updated = await Procurement.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: "Error updating procurement" });
  }
};

exports.softDeleteProcurement = async (req, res) => {
  try {
    await Procurement.findByIdAndUpdate(req.params.id, { isDeleted: true });
    res.send("Procurement soft-deleted");
  } catch (error) {
    res.status(500).json({ error: "Error deleting procurement" });
  }
};
