const express = require("express");
const router = express.Router();

const {
  login,
  getMe
} = require("../controller/authController");

const { protect } = require("../middleware/authMiddleware");

router.post("/login", login);
router.get("/me", protect, getMe);

module.exports = router;