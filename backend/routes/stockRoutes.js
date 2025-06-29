const express = require("express");
const router = express.Router();
const stockController = require("../controllers/stockController");
const { authenticate, authorizeRoles } = require("../middleware/authMiddleware");

router.get("/", authenticate, stockController.getAllStock);
router.post("/", authenticate, authorizeRoles("admin", "manager"), stockController.createStock);
router.put("/:id", authenticate, authorizeRoles("admin", "manager"), stockController.updateStock);
router.delete("/:id", authenticate, authorizeRoles("admin"), stockController.deleteStock);

module.exports = router;

