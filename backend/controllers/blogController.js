import Blog from "../models/Blog.js";

/**
 * Get all blog posts
 */
export const getPosts = async (req, res) => {
  try {
    const posts = await Blog.find().sort({ createdAt: -1 });
    res.json(posts);
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

/**
 * Get single blog post by ID
 */
export const getPostById = async (req, res) => {
  try {
    const post = await Blog.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });
    res.json(post);
  } catch (error) {
    console.error("Error fetching post:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

/**
 * Create a new blog post
 * Supports multiple image uploads (Cloudinary)
 */
export const createPost = async (req, res) => {
  try {
    console.log("req.body:", req.body);
    console.log("req.files:", req.files);

    const { title, content, author } = req.body;

    if (!title || !content || !author) {
      return res.status(400).json({ message: "Title, content, and author are required" });
    }

    // Multer + Cloudinary: make sure req.files exists
    const images = Array.isArray(req.files)
      ? req.files.map((file) => file.path).filter(Boolean)
      : [];

    const post = new Blog({ title, content, author, images });
    await post.save();

    res.status(201).json(post);
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

/**
 * Update blog post (append new images if provided)
 */
export const updatePost = async (req, res) => {
  try {
    console.log("req.body:", req.body);
    console.log("req.files:", req.files);

    const { title, content, author } = req.body;

    const post = await Blog.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });

    // Safely handle new images
    const newImages = Array.isArray(req.files)
      ? req.files.map((file) => file.path).filter(Boolean)
      : [];

    post.title = title || post.title;
    post.content = content || post.content;
    post.author = author || post.author;
    post.images = [...(post.images || []), ...newImages]; // append new images

    await post.save();
    res.json(post);
  } catch (error) {
    console.error("Error updating post:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

/**
 * Delete a blog post
 */
export const deletePost = async (req, res) => {
  try {
    const post = await Blog.findByIdAndDelete(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });

    res.json({ message: "Post deleted successfully" });
  } catch (error) {
    console.error("Error deleting post:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};
