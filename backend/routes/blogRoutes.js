import express from "express";
import {
  getPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
} from "../controllers/blogController.js";
import parser from "../middleware/upload.js";

const router = express.Router();

router.get("/", getPosts);
router.get("/:id", getPostById);
router.post("/",  parser.array("images"), createPost); // support multi images
router.put("/:id",  parser.array("images"), updatePost);
router.delete("/:id",  deletePost);

export default router;
