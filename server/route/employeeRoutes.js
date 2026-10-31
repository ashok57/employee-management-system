const express = require("express");

const router = express.Router();

const { createEmployee } = require("../controller/employeeController");

// POST /api/employees
router.post("/", createEmployee);

module.exports = router;
