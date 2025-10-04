import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: String, default: "Admin" },
    images: { type: [String], default: [] } // supports multiple images
  },
  { timestamps: true } // automatically adds createdAt and updatedAt
);

export default mongoose.model("Blog", blogSchema);
