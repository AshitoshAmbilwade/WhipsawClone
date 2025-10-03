// src/api/blogApi.js
import apiHelper from "./apiHelper";

const getAuthHeader = () => {
  const token = localStorage.getItem("token");
  return { headers: { Authorization: `Bearer ${token}` } };
};

export const getAllPosts = async () => {
  const { data } = await apiHelper.get("/blog");
  return data;
};

export const createPost = async (post) => {
  const { data } = await apiHelper.post("/blog", post, getAuthHeader());
  return data;
};

export const updatePost = async (id, post) => {
  const { data } = await apiHelper.put(`/blog/${id}`, post, getAuthHeader());
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