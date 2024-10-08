// reportRoutes.js
const express = require("express");
const { generateReport } = require("../controllers/reportController");
const protect = require("../middleware/authMiddleware");
const router = express.Router();

router.get("/report", protect, generateReport);

module.exports = router;
