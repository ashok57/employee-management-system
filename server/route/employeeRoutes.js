const express = require("express");
const router = express.Router();

const {
  createEmployee,
  getEmployees,
} = require("../controller/employeeController");

// POST /api/employees
router.post("/", createEmployee);

// Get all employees
router.get("/", getEmployees);

module.exports = router;
