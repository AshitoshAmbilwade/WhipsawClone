import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPostById } from "../api/blogApi";

function BlogDetail() {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    getPostById(id).then(setPost);
  }, [id]);

  if (!post) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
      <p className="text-gray-500 mb-6">
        By {post.author || "Admin"} on{" "}
        {new Date(post.createdAt).toLocaleDateString()}
      </p>
      <div className="prose max-w-full">{post.content}</div>
    </div>
  );
}

export default BlogDetail;
