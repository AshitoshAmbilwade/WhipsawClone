import { useEffect, useState } from "react";
import { getAllPosts as getPosts } from "../api/blogApi";
import { Link } from "react-router-dom";

function BlogList() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getPosts().then(setPosts);
  }, []);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Our Blog</h1>
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
            <Link
              to={`/blog/${post._id}`}
              className="text-blue-600 hover:underline"
            >
              Read More
            </Link>
          </div>
        ))
      )}
    </div>
  );
}

export default BlogList;
