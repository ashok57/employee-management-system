const express = require("express");

const router = express.Router();

const {
  createEmployee
} = require("../controllers/employeeController");

// POST /api/employees
router.post("/", createEmployee);

module.exports = router;