import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  getAllPosts,
  createPost,
  updatePost,
  deletePost,
} from "../api/blogApi";
import {
  Plus,
  Edit3,
  Trash2,
  Image as ImageIcon,
  Save,
  X,
  Calendar,
  User,
  FileText,
  BarChart3,
  Settings,
  LogOut,
  Eye,
  Upload,
  CheckCircle,
  AlertCircle
} from "lucide-react";

const AdminDashboard = () => {
  const [posts, setPosts] = useState([]);
  const [form, setForm] = useState({ title: "", content: "", author: "" });
  const [editingId, setEditingId] = useState(null);
  const [newImages, setNewImages] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);
  const [existingImages, setExistingImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("posts");
  const [alert, setAlert] = useState({ show: false, message: "", type: "" });
  const fileInputRef = useRef();

  // Show alert message
  const showAlert = (message, type = "success") => {
    setAlert({ show: true, message, type });
    setTimeout(() => setAlert({ show: false, message: "", type: "" }), 4000);
  };

  // Load all posts
  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    setIsLoading(true);
    try {
      const data = await getAllPosts();
      // Ensure dates are properly formatted
      const postsWithFormattedDates = data.map(post => ({
        ...post,
        formattedDate: post.createdAt ? new Date(post.createdAt).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        }) : "Unknown date"
      }));
      setPosts(postsWithFormattedDates);
    } catch (err) {
      console.error("Failed to fetch posts", err);
      showAlert("Failed to load posts", "error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setNewImages(files);

    // Preview new images
    const previews = files.map((file) => URL.createObjectURL(file));
    setPreviewImages(previews);
  };

  const removeImage = (index) => {
    const updatedImages = [...newImages];
    const updatedPreviews = [...previewImages];
    
    URL.revokeObjectURL(updatedPreviews[index]);
    updatedImages.splice(index, 1);
    updatedPreviews.splice(index, 1);
    
    setNewImages(updatedImages);
    setPreviewImages(updatedPreviews);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Check if token exists
    const token = localStorage.getItem("token");
    if (!token) {
      showAlert("You must be logged in to create or edit a post!", "error");
      setIsLoading(false);
      return;
    }

    try {
      const formData = new FormData();
      formData.append("title", form.title);
      formData.append("content", form.content);
      formData.append("author", form.author);

      // Append new images
      newImages.forEach((image) => formData.append("images", image));

      if (editingId) {
        await updatePost(editingId, formData, true);
        showAlert("Post updated successfully!");
      } else {
        await createPost(formData, true);
        showAlert("Post created successfully!");
      }

      // Reset everything
      resetForm();
      fetchPosts();
    } catch (err) {
      console.error("Failed to save post", err);
      showAlert("Error saving post. Please check console for details.", "error");
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setForm({ title: "", content: "", author: "" });
    setEditingId(null);
    setNewImages([]);
    setPreviewImages([]);
    setExistingImages([]);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleEdit = (post) => {
    setForm({ 
      title: post.title || "", 
      content: post.content || "", 
      author: post.author || "" 
    });
    setEditingId(post._id);
    setNewImages([]);
    setPreviewImages([]);
    setExistingImages(post.images || []);
    if (fileInputRef.current) fileInputRef.current.value = "";
    
    // Scroll to form
    document.getElementById('post-form').scrollIntoView({ behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");
    if (!token) {
      showAlert("You must be logged in to delete a post!", "error");
      return;
    }

    if (!window.confirm("Are you sure you want to delete this post? This action cannot be undone.")) return;

    try {
      await deletePost(id);
      showAlert("Post deleted successfully!");
      fetchPosts();
    } catch (err) {
      console.error("Failed to delete post", err);
      showAlert("Error deleting post. Please check console for details.", "error");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/admin/login";
  };

  // Cleanup previews to avoid memory leaks
  useEffect(() => {
    return () => {
      previewImages.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [previewImages]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };

  const stats = [
    { label: "Total Posts", value: posts.length, icon: FileText, color: "blue" },
    { label: "This Month", value: posts.filter(post => {
      const postDate = new Date(post.createdAt);
      const now = new Date();
      return postDate.getMonth() === now.getMonth() && postDate.getFullYear() === now.getFullYear();
    }).length, icon: BarChart3, color: "green" },
    { label: "With Images", value: posts.filter(post => post.images && post.images.length > 0).length, icon: ImageIcon, color: "purple" },
    { label: "Drafts", value: 0, icon: Edit3, color: "yellow" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-1000 to-gray-900">
      {/* Alert Notification */}
      <AnimatePresence>
        {alert.show && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className={`fixed top-4 right-4 z-50 p-4 rounded-xl border backdrop-blur-md ${
              alert.type === "error" 
                ? "bg-red-500/20 border-red-500/30 text-red-200" 
                : "bg-green-500/20 border-green-500/30 text-green-200"
            }`}
          >
            <div className="flex items-center gap-3">
              {alert.type === "error" ? <AlertCircle className="w-5 h-5" /> : <CheckCircle className="w-5 h-5" />}
              <span className="font-medium">{alert.message}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <div className="flex">
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="w-64 bg-gray-800/50 backdrop-blur-md border-r border-gray-700 min-h-screen p-6"
        >
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
              <Settings className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-white font-bold text-lg">Admin Panel</h1>
              <p className="text-gray-400 text-sm">Content Management</p>
            </div>
          </div>

          <nav className="space-y-2">
            {[
              { id: "posts", label: "Posts", icon: FileText },
              { id: "analytics", label: "Analytics", icon: BarChart3 },
              { id: "media", label: "Media", icon: ImageIcon },
              { id: "settings", label: "Settings", icon: Settings }
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                  activeTab === item.id
                    ? "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                    : "text-gray-400 hover:text-white hover:bg-gray-700/50"
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </button>
            ))}
          </nav>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-gray-400 hover:text-red-400 hover:bg-red-500/20 mt-8 transition-all"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Logout</span>
          </button>
        </motion.div>

        {/* Main Content */}
        <div className="flex-1 p-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-between items-center mb-8"
          >
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">Content Manager</h1>
              <p className="text-gray-400">Create and manage your blog posts</p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={resetForm}
              className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-6 py-3 rounded-xl font-semibold flex items-center gap-2 hover:shadow-lg hover:shadow-blue-500/25 transition-all"
            >
              <Plus className="w-5 h-5" />
              New Post
            </motion.button>
          </motion.div>

          {/* Stats Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                variants={itemVariants}
                className="bg-gray-800/30 backdrop-blur-sm rounded-2xl border border-gray-700 p-6"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm font-medium">{stat.label}</p>
                    <p className="text-2xl font-bold text-white mt-2">{stat.value}</p>
                  </div>
                  <div className={`p-3 rounded-xl bg-${stat.color}-500/20 border border-${stat.color}-500/30`}>
                    <stat.icon className={`w-6 h-6 text-${stat.color}-400`} />
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Blog Form */}
          <motion.form
            id="post-form"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            onSubmit={handleSubmit}
            className="bg-gray-800/30 backdrop-blur-sm rounded-2xl border border-gray-700 p-6 mb-8"
            encType="multipart/form-data"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-white">
                {editingId ? "Edit Post" : "Create New Post"}
              </h2>
              {editingId && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="text-white font-medium mb-2 block">Title</label>
                  <input
                    type="text"
                    name="title"
                    placeholder="Enter post title..."
                    value={form.title}
                    onChange={handleChange}
                    className="w-full bg-gray-700/50 border border-gray-600 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="text-white font-medium mb-2 block">Author</label>
                  <input
                    type="text"
                    name="author"
                    placeholder="Author name..."
                    value={form.author}
                    onChange={handleChange}
                    className="w-full bg-gray-700/50 border border-gray-600 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="text-white font-medium mb-2 block">Images</label>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="border-2 border-dashed border-gray-600 rounded-xl p-6 text-center cursor-pointer hover:border-blue-500 transition-colors"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-400 text-sm">
                      Click to upload images or drag and drop
                    </p>
                    <input
                      ref={fileInputRef}
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  </motion.div>
                </div>
              </div>

              <div>
                <label className="text-white font-medium mb-2 block">Content</label>
                <textarea
                  name="content"
                  placeholder="Write your post content here..."
                  value={form.content}
                  onChange={handleChange}
                  className="w-full h-48 bg-gray-700/50 border border-gray-600 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  required
                />
              </div>
            </div>

            {/* Image Previews */}
            <div className="mt-6">
              {/* Existing Images */}
              {existingImages.length > 0 && (
                <div className="mb-4">
                  <h4 className="text-white font-medium mb-3">Current Images</h4>
                  <div className="flex flex-wrap gap-3">
                    {existingImages.map((img, idx) => (
                      <div key={idx} className="relative group">
                        <img
                          src={img}
                          alt={`existing ${idx}`}
                          className="w-24 h-24 object-cover rounded-xl border-2 border-gray-600"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* New Image Preview */}
              {previewImages.length > 0 && (
                <div>
                  <h4 className="text-white font-medium mb-3">New Images</h4>
                  <div className="flex flex-wrap gap-3">
                    {previewImages.map((img, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="relative group"
                      >
                        <img
                          src={img}
                          alt={`preview ${idx}`}
                          className="w-24 h-24 object-cover rounded-xl border-2 border-blue-500/50"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(idx)}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="flex gap-3 mt-6">
              <motion.button
                type="submit"
                disabled={isLoading}
                whileHover={{ scale: isLoading ? 1 : 1.05 }}
                whileTap={{ scale: isLoading ? 1 : 0.95 }}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all ${
                  isLoading
                    ? "bg-gray-600 cursor-not-allowed"
                    : "bg-gradient-to-r from-blue-500 to-cyan-500 hover:shadow-lg hover:shadow-blue-500/25"
                } text-white`}
              >
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    {editingId ? "Updating..." : "Creating..."}
                  </>
                ) : (
                  <>
                    <Save className="w-5 h-5" />
                    {editingId ? "Update Post" : "Create Post"}
                  </>
                )}
              </motion.button>

              {editingId && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-6 py-3 rounded-xl font-semibold text-gray-400 hover:text-white border border-gray-600 hover:border-gray-500 transition-colors"
                >
                  Cancel
                </button>
              )}
            </div>
          </motion.form>

          {/* Blog List */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-gray-800/30 backdrop-blur-sm rounded-2xl border border-gray-700 overflow-hidden"
          >
            <div className="p-6 border-b border-gray-700">
              <h2 className="text-xl font-semibold text-white">All Posts ({posts.length})</h2>
            </div>

            {isLoading ? (
              <div className="p-8 text-center">
                <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-gray-400">Loading posts...</p>
              </div>
            ) : posts.length === 0 ? (
              <div className="p-8 text-center">
                <FileText className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                <h3 className="text-white font-semibold mb-2">No posts yet</h3>
                <p className="text-gray-400">Create your first blog post to get started</p>
              </div>
            ) : (
              <div className="divide-y divide-gray-700">
                {posts.map((post, index) => (
                  <motion.div
                    key={post._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="p-6 hover:bg-gray-700/20 transition-colors"
                  >
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-4 mb-3">
                          <h3 className="text-lg font-semibold text-white">{post.title}</h3>
                          <span className="bg-blue-500/20 text-blue-400 text-xs font-medium px-2 py-1 rounded-full">
                            Published
                          </span>
                        </div>
                        
                        <div className="flex items-center gap-4 text-sm text-gray-400 mb-3">
                          <div className="flex items-center gap-1">
                            <User className="w-4 h-4" />
                            <span>{post.author || "Admin"}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            <span>{post.formattedDate}</span>
                          </div>
                          {post.images && post.images.length > 0 && (
                            <div className="flex items-center gap-1">
                              <ImageIcon className="w-4 h-4" />
                              <span>{post.images.length} images</span>
                            </div>
                          )}
                        </div>

                        <p className="text-gray-300 line-clamp-2 mb-3">
                          {post.content.substring(0, 150)}...
                        </p>

                        {/* Post Images Preview */}
                        {post.images && post.images.length > 0 && (
                          <div className="flex gap-2">
                            {post.images.slice(0, 3).map((img, idx) => (
                              <img
                                key={idx}
                                src={img}
                                alt={`post ${idx}`}
                                className="w-12 h-12 object-cover rounded-lg border border-gray-600"
                              />
                            ))}
                            {post.images.length > 3 && (
                              <div className="w-12 h-12 bg-gray-700 rounded-lg flex items-center justify-center text-xs text-gray-400">
                                +{post.images.length - 3}
                              </div>
                            )}
                          </div>
                        )}
                      </div>

                      <div className="flex gap-2">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleEdit(post)}
                          className="flex items-center gap-2 bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 px-4 py-2 rounded-xl border border-blue-500/30 transition-colors"
                        >
                          <Edit3 className="w-4 h-4" />
                          Edit
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleDelete(post._id)}
                          className="flex items-center gap-2 bg-red-500/20 text-red-400 hover:bg-red-500/30 px-4 py-2 rounded-xl border border-red-500/30 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                          Delete
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;