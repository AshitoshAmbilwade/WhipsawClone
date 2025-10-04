import dotenv from "dotenv";
dotenv.config(); // Must be at the very top

import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import cloudinary from "./config/cloudinary.js";

import blogRoutes from "./routes/blogRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";

connectDB(); // Connect to MongoDB

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/blog", blogRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/contact", contactRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
