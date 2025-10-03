// src/api/authApi.js
import apiHelper from "./apiHelper";

export const loginAdmin = async (credentials) => {
  const { data } = await apiHelper.post("/auth/login", credentials);
  return data;
};
