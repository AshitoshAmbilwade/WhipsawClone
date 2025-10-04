import apiHelper from "./apiHelper";

// Helper to attach Authorization header
const getAuthHeader = (isMultipart = false) => {
  const token = localStorage.getItem("token"); // JWT token from login
  if (!token) throw new Error("No token found, please login");
  
  const headers = { Authorization: `Bearer ${token}` };
  if (isMultipart) headers["Content-Type"] = "multipart/form-data";
  return { headers };
};

export const getAllPosts = async () => {
  const { data } = await apiHelper.get("/blog");
  return data;
};

export const createPost = async (post, isMultipart = false) => {
  const { data } = await apiHelper.post("/blog", post, getAuthHeader(isMultipart));
  return data;
};

export const updatePost = async (id, post, isMultipart = false) => {
  const { data } = await apiHelper.put(`/blog/${id}`, post, getAuthHeader(isMultipart));
  return data;
};

export const deletePost = async (id) => {
  const { data } = await apiHelper.delete(`/blog/${id}`, getAuthHeader());
  return data;
};

export const getPostById = async (id) => {
  const { data } = await apiHelper.get(`/blog/${id}`);
  return data;
};
