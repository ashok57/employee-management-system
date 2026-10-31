const express = require("express");
const router = express.Router();

const {
  createEmployee,
  getEmployees, updateEmployee,  deleteEmployee
} = require("../controller/employeeController");


const Employee = require("../model/Employee");

// POST /api/employees
router.post("/", createEmployee);

// Get all employees
router.get("/", getEmployees);

//update an employee byt id
router.put("/:id", updateEmployee);


// delete an employee by id 
router.put("/:id", deleteEmployee);


module.exports = router;
