const Employee = require("../model/Employee");

// CREATE EMPLOYEE

const createEmployee = async (req, res) => {
  try {
    console.log("Content-Type:", req.headers["content-type"]);
    console.log("Request Body:", req.body);

    const employee = await Employee.create(req.body);

    res.status(201).json({
      success: true,
      message: "Employee created successfully",
      data: employee,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// 2. GET ALL EMPLOYEES

const getEmployees = async (req, res) => {
  try {
    const employees = await Employee.find();

    return res.status(200).json({
      success: true,
      count: employees.length,
      data: employees,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createEmployee,
  getEmployees,
};
