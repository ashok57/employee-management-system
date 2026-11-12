
const User = require("../model/User");
const Employee = require("../model/Employee");
const bcrypt = require("bcryptjs");

// ADMIN: Create employee login account
const createEmployeeAccount = async (req, res) => {
  try {
    const { employeeId, password } = req.body;

    // Validate input
    if (!employeeId || !password) {
      return res.status(400).json({
        success: false,
        message: "Employee ID and password are required",
      });
    }

    if (password.length < 12) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 12 characters",
      });
    }

    // Find existing employee
    const employee = await Employee.findOne({
      employeeId: employeeId.trim(),
    });

    if (!employee) {
      return res.status(404).json({
        success: false,
        message: "Employee not found",
      });
    }

    // Check whether account already exists
    const existingUser = await User.findOne({
      $or: [
        { email: employee.email },
        { employee: employee._id },
      ],
    });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "A login account already exists for this employee or email",
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create employee User account
    const user = await User.create({
      name: employee.name,
      email: employee.email,
      password: hashedPassword,
      role: "employee",
      employee: employee._id,
    });

    return res.status(201).json({
      success: true,
      message: "Employee login account created successfully",
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        employee: user.employee,
      },
    });
  } catch (error) {
    console.error("Create employee account error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Unable to create employee account",
    });
  }
};

module.exports = { createEmployeeAccount };
