
const Employee = require("../model/Employee");
const Activity = require("../model/Activity");

// Helper: Save activity without breaking employee CRUD
const saveActivity = async (activityData) => {
  try {
    await Activity.create(activityData);
  } catch (error) {
    console.error("Activity logging failed:", error.message);
  }
};

// CREATE EMPLOYEE
const createEmployee = async (req, res) => {
  try {
    const employee = await Employee.create(req.body);

    await saveActivity({
      action: "CREATE",
      employeeId: employee.employeeId,
      employeeName: employee.name,
      description: `${employee.name} (${employee.employeeId}) was added.`,
    });

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

// GET ALL EMPLOYEES
const getEmployees = async (req, res) => {
  try {
    const employees = await Employee.find().sort({ createdAt: -1 });

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

// UPDATE EMPLOYEE
const updateEmployee = async (req, res) => {
  try {
    const employee = await Employee.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!employee) {
      return res.status(404).json({
        success: false,
        message: "Employee not found",
      });
    }

    await saveActivity({
      action: "UPDATE",
      employeeId: employee.employeeId,
      employeeName: employee.name,
      description: `${employee.name} (${employee.employeeId}) was updated.`,
    });

    res.status(200).json({
      success: true,
      message: "Employee updated successfully",
      data: employee,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// DELETE EMPLOYEE
const deleteEmployee = async (req, res) => {
  try {
    const employee = await Employee.findByIdAndDelete(req.params.id);

    if (!employee) {
      return res.status(404).json({
        success: false,
        message: "Employee not found",
      });
    }

    await saveActivity({
      action: "DELETE",
      employeeId: employee.employeeId,
      employeeName: employee.name,
      description: `${employee.name} (${employee.employeeId}) was deleted.`,
    });

    res.status(200).json({
      success: true,
      message: "Employee deleted successfully",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createEmployee,
  getEmployees,
  updateEmployee,
  deleteEmployee,
};
