const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config();


const employeeRoutes = require("./route/employeeRoutes");
const activityRoutes = require("./route/activityRoutes");
const authRoutes = require("./route/authRoutes");
const employeeAuthRoutes = require("./route/employeeAuthRoutes");


const app = express();

// Middleware

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended : true}));



app.use("/api/employees", employeeRoutes);
app.use("/api/activities", activityRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/employee-auth", employeeAuthRoutes);

// Test route
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Employee Management API is running!",
  });
});

// Connect MongoDB and start server
const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected successfully!");

    app.listen(PORT, () => {
      console.log(`Server running on the port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("MongooseDB connection failed :", error.message);
  });
