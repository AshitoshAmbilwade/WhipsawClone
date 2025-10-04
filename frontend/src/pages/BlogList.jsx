import { useEffect, useState } from "react";
import { getAllPosts as getPosts } from "../api/blogApi";
import { Link, useNavigate } from "react-router-dom";

function BlogList() {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getPosts().then(setPosts);
  }, []);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* Page Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-center flex-1">Our Blog</h1>
        {/* Admin Login Link */}
        <button
          onClick={() => navigate("/admin/login")}
          className="text-sm text-gray-500 hover:underline ml-4"
        >
          Admin Login
        </button>
      </div>

      {/* Blog Posts */}
      {posts.length === 0 ? (
        <p className="text-center text-gray-500">No posts available.</p>
      ) : (
        posts.map((post) => (
          <div
            key={post._id}
            className="mb-6 p-6 border rounded-xl shadow hover:shadow-lg transition"
          >
            <h2 className="text-2xl font-semibold mb-2">{post.title}</h2>
            <p className="text-gray-500 text-sm mb-2">
              By {post.author || "Admin"} -{" "}
              {new Date(post.createdAt).toLocaleDateString()}
            </p>
            <p className="mb-4">{post.content.substring(0, 150)}...</p>
            <div className="flex justify-between items-center">
              <Link
                to={`/blog/${post._id}`}
                className="text-blue-600 hover:underline"
              >
                Read More
              </Link>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default BlogList;
