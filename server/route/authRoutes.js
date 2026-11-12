const express = require("express");
const router = express.Router();

const {
  login,
  getMe
} = require("../controller/authController");

const { protect } = require("../middleware/authMiddleware");

router.post("/login", login);
router.get("/me", protect, (req, res, next) => {
  res.set("Cache-Control", "no-store");
  next();
}, getMe);

module.exports = router;