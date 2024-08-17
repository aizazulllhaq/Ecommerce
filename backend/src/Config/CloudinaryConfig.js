import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import {
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET,
  CLOUDINARY_NAME,
} from "../constant.js";

cloudinary.config({
  cloud_name: CLOUDINARY_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });
    console.log(`File is uploaded on cloudinary  : ${response.url}`);

    // delete file from locally
    fs.unlinkSync(localFilePath);

    return response;
  } catch (error) {
    // delete file from locally bcoz its crapped
    fs.unlinkSync(localFilePath);
  }
};

export default uploadOnCloudinary;
