const express = require("express");
const router = express.Router();

const employeeController = require("../controller/employeeController");

const {protect} = require("../middleware/authMiddleware");
const {authorize} = require ("../middleware/roleMiddleware");


// Allow employees to update only their own basic profile

const authorizeOwnEmployeeUpdate = (req, res, next) => {
  // Admin can update any employee
  if(req.user.role === "admin") {
    return next();
  }

  //Verify employee is updating their own record

  if(
    req.user.role !== "employee" ||
    !req.user.employee ||
    String(req.user.employee) !== req.params.id
  ){
    return res.status(403).json({
      success : false,
      message : "You can only update your own profile.",
    });
  }

  const allowedFields = ["name", "phone"];
  const updates = {};


  allowedFields.forEach((field) => {
    if(Object.prototype.hasOwnProperty.call(req.body, field)) {
      updates[field] = req.body[field];
    }
  });

  if(Object.keys(updates).length === 0) {
    return res.status(400).json ({
      success : false,
      message : "No permitted profile fields provided.",
    });
  }

  req.body = updates;
  next();
};
router.post("/", protect, authorize("admin"), employeeController.createEmployee);

router.get("/", protect, authorize("admin"), employeeController.getEmployees);


router.put("/:id", protect, authorize("admin", "employee"), authorizeOwnEmployeeUpdate, employeeController.updateEmployee);

router.delete("/:id", protect, authorize("admin"), employeeController.deleteEmployee);

module.exports = router;
