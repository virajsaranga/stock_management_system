const express = require("express");
const router = express.Router();
const controller = require("../controllers/procurementController");
const { authenticate, authorizeRoles } = require("../middleware/authMiddleware");

router.get("/", authenticate, controller.getAllProcurements);
router.post("/", authenticate, authorizeRoles("admin", "manager"), controller.createProcurement);
router.put("/:id", authenticate, authorizeRoles("admin", "manager"), controller.updateProcurement);
router.delete("/:id", authenticate, authorizeRoles("admin"), controller.softDeleteProcurement);

module.exports = router;
