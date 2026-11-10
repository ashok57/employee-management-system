const express = require("express");
const router = express.Router();

const employeeController = require("../controller/employeeController");

router.post("/", employeeController.createEmployee);

router.get("/", employeeController.getEmployees);

router.put("/:id", employeeController.updateEmployee);

router.delete("/:id", employeeController.deleteEmployee);

module.exports = router;
