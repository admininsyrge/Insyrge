import dotenv from "dotenv";
import path from "path";
dotenv.config({
    path: process.env.ENV_FILE || path.join(__dirname, "../../shared/backend.env"),
});

import { v2 as cloudinary } from "cloudinary";
console.log(process.env.CLOUDINARY_CLOUD_NAME!)

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
    api_key: process.env.CLOUDINARY_API_KEY!,
    api_secret: process.env.CLOUDINARY_API_SECRET!,
});

export default cloudinary;
