const PurchaseOrder = require("../models/PurchaseOrder");
const Procurement = require("../models/Procurement");

exports.getAllPOs = async (req, res) => {
  const pos = await PurchaseOrder.find().populate("procurement");
  res.json(pos);
};

exports.generatePO = async (req, res) => {
  const { procurementId, supplier } = req.body;
  const procurement = await Procurement.findById(procurementId).populate("items.stockItem");
  if (!procurement) return res.status(404).send("Procurement not found");

  const totalCost = procurement.items.reduce((sum, item) => {
    return sum + item.quantity * item.stockItem.unitPrice;
  }, 0);

  const po = new PurchaseOrder({
    procurement: procurementId,
    supplier,
    approved: true,
    totalCost,
    pdfPath: '', //
  });

  await po.save();
  res.status(201).json(po);
};
