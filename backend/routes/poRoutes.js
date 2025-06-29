const express = require("express");
const router = express.Router();
const controller = require("../controllers/poController");
const { authenticate, authorizeRoles } = require("../middleware/authMiddleware");

router.get("/", authenticate, controller.getAllPOs);
router.post("/", authenticate, authorizeRoles("admin", "manager"), controller.generatePO);

module.exports = router;
 