import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: String, default: "Admin" },
  date: { type: Date, default: Date.now },
  image: { type: String }
});

export default mongoose.model("Blog", blogSchema);
