import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_SECRET_KEY,
});

export const uploadImage = async (file) => {
  return await cloudinary.uploader.upload(file, {
    upload_preset: process.env.CLOUDINARY_UPLOAD_PRESET,
  });
};

export const uploadImageToCloudinary = async (image) => {
  try {
    const result = await cloudinary.uploader.upload(image, {
      folder: "products",
    });
    return result.secure_url; // Return the uploaded image URL
  } catch (error) {
    console.error("Error uploading image to Cloudinary:", error.message);
    throw new Error("Failed to upload image");
  }
};

export default cloudinary;