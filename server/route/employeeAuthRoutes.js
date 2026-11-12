
const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/authMiddleware");
const { authorize } = require("../middleware/roleMiddleware");

const {
  createEmployeeAccount,
} = require("../controller/employeeAuthController");

// Only Admin can create employee login accounts
router.post(
  "/create-account",
  protect,
  authorize("admin"),
  createEmployeeAccount
);

module.exports = router;
