// seedAdmin.js
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import Admin from "./models/Admin.js";

dotenv.config();

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
})
.then(() => console.log("MongoDB connected"))
.catch((err) => {
  console.error("MongoDB connection error:", err);
  process.exit(1);
});

// Seed function
const seedAdmin = async () => {
  try {
    const existingAdmin = await Admin.findOne({ username: "admin" });
    if (existingAdmin) {
      console.log("Admin already exists");
      process.exit(0);
    }

    const hashedPassword = await bcrypt.hash("admin123", 10);

    const admin = new Admin({
      username: "admin",
      password: hashedPassword,
    });

    await admin.save();
    console.log("Default admin created!");
    process.exit(0);
  } catch (err) {
    console.error("Error creating admin:", err);
    process.exit(1);
  }
};

seedAdmin();
