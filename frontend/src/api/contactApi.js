import api from "./apiHelper";

export const sendContactForm = async (formData) => {
  const res = await api.post("/contact", formData);
  return res.data;
};
