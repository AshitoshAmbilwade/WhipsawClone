import { useEffect, useState } from "react";
import { getAllPosts, createPost, updatePost, deletePost } from "../api/blogApi";

const AdminDashboard = () => {
  const [posts, setPosts] = useState([]);
  const [form, setForm] = useState({ title: "", content: "", author: "" });
  const [editingId, setEditingId] = useState(null);

  // Load all posts
  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const data = await getAllPosts();
      setPosts(data);
    } catch (err) {
      console.error("Failed to fetch posts", err);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await updatePost(editingId, form);
      } else {
        await createPost(form);
      }
      setForm({ title: "", content: "", author: "" });
      setEditingId(null);
      fetchPosts();
    } catch (err) {
      console.error("Failed to save post", err);
    }
  };

  const handleEdit = (post) => {
    setForm({ title: post.title, content: post.content, author: post.author });
    setEditingId(post._id);
  };

  const handleDelete = async (id) => {
    try {
      await deletePost(id);
      fetchPosts();
    } catch (err) {
      console.error("Failed to delete post", err);
    }
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      {/* Blog Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg p-6 rounded-xl mb-8 space-y-4"
      >
        <h2 className="text-xl font-semibold">
          {editingId ? "Edit Post" : "Add New Post"}
        </h2>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
          className="w-full border p-2 rounded-lg"
          required
        />
        <textarea
          name="content"
          placeholder="Content"
          value={form.content}
          onChange={handleChange}
          className="w-full border p-2 rounded-lg"
          rows="4"
          required
        />
        <input
          type="text"
          name="author"
          placeholder="Author"
          value={form.author}
          onChange={handleChange}
          className="w-full border p-2 rounded-lg"
          required
        />
        <button
          type="submit"
          className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800"
        >
          {editingId ? "Update Post" : "Create Post"}
        </button>
      </form>

      {/* Blog List */}
      <div className="bg-white shadow-lg p-6 rounded-xl">
        <h2 className="text-xl font-semibold mb-4">All Posts</h2>
        {posts.length === 0 ? (
          <p>No posts available.</p>
        ) : (
          <ul className="space-y-4">
            {posts.map((post) => (
              <li
                key={post._id}
                className="flex justify-between items-center border-b pb-2"
              >
                <div>
                  <h3 className="font-bold">{post.title}</h3>
                  <p className="text-sm text-gray-500">
                    {post.author} - {new Date(post.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="space-x-2">
                  <button
                    onClick={() => handleEdit(post)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(post._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
