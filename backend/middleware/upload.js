import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "blogs", // folder in Cloudinary
    allowed_formats: ["jpg", "png", "jpeg", "webp"]
  }
});

const parser = multer({ storage });

export default parser;
