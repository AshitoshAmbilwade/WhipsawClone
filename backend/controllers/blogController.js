import Blog from "../models/Blog.js";

export const getPosts = async (req, res) => {
  const posts = await Blog.find().sort({ date: -1 });
  res.json(posts);
};

export const getPostById = async (req, res) => {
  const post = await Blog.findById(req.params.id);
  if (!post) return res.status(404).json({ message: "Post not found" });
  res.json(post);
};

export const createPost = async (req, res) => {
  const { title, content, author, image } = req.body;
  const post = new Blog({ title, content, author, image });
  await post.save();
  res.json(post);
};

export const updatePost = async (req, res) => {
  const post = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!post) return res.status(404).json({ message: "Post not found" });
  res.json(post);
};

export const deletePost = async (req, res) => {
  const post = await Blog.findByIdAndDelete(req.params.id);
  if (!post) return res.status(404).json({ message: "Post not found" });
  res.json({ message: "Post deleted" });
};
