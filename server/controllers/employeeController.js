const Employee = require ('../models/Employee');

// CREATE EMPLOYEE

const createEmployee =  async (req, res) => {
  try {
    const employee = await Employee.create(req.body);

    res.status(201).json({
      success : true,
      message : "Employee created successfully",
      data : employee
    });
  }
    catch(error) {
      res.status(400).json({
        success : false,
        message : error.message
      });
    }
};


module.exports = {
  createEmployee
};