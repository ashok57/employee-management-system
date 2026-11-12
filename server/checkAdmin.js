require("dotenv").config();

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("./model/User");

async function checkAdmin() {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    const email = process.env.ADMIN_EMAIL.trim().toLowerCase();

    const admin = await User.findOne({ email }).select("+password");

    if (!admin) {
      console.log("Admin account not found.");
      return;
    }

    console.log("Admin account found.");
    console.log("Email matches:", admin.email === email);
    console.log("Role:", admin.role);

    const passwordMatches = await bcrypt.compare(
      process.env.ADMIN_PASSWORD,
      admin.password,
    );

    console.log("ENV password matches DB password:", passwordMatches);
  } catch (error) {
    console.error("Error:", error.message);
  } finally {
    await mongoose.disconnect();
  }
}

checkAdmin();
