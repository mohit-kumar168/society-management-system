import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath, folder = "sms") => {
    try {
        if (!localFilePath) return null;
        const response = await cloudinary.uploader.upload(localFilePath, {
            folder: folder,
            resource_type: "auto",
        });

        if (fs.existsSync(localFilePath)) {
            fs.unlinkSync(localFilePath);
        }
        return response;
    } catch (error) {
        if (fs.existsSync(localFilePath)) {
            fs.unlinkSync(localFilePath);
        }
        return null;
    }
};

const createUserFolder = async (userId, userRole) => {
    try {
        const userFolderPath = `sms/users/${userRole}_${userId}`;

        return {
            success: true,
            userFolderPath,
            message: "User folder created successfully",
        };
    } catch (error) {
        return {
            success: false,
            message: "Failed to create user folder",
        };
    }
};

const uploadToUserFolder = async (
    localFilePath,
    userId,
    userRole,
    fileName
) => {
    try {
        console.log("🔍 Cloudinary upload parameters:", {
            localFilePath,
            userId,
            userRole,
            fileName,
        });

        if (!localFilePath) {
            console.log("❌ No local file path provided");
            return null;
        }

        const userFolderPath = `sms/users/${userRole}_${userId}`;
        console.log("📁 Upload folder path:", userFolderPath);

        const response = await cloudinary.uploader.upload(localFilePath, {
            folder: userFolderPath,
            resource_type: "auto",
            public_id: fileName,
            overwrite: true,
        });

        console.log("✅ Cloudinary upload successful:", {
            secure_url: response.secure_url,
            public_id: response.public_id,
        });

        fs.unlinkSync(localFilePath);
        console.log("🗑️ Local file cleaned up");
        return response;
    } catch (error) {
        console.error("❌ Cloudinary upload error:", error);
        console.error("📋 Error details:", {
            message: error.message,
            http_code: error.http_code,
            error: error.error,
        });

        if (fs.existsSync(localFilePath)) {
            fs.unlinkSync(localFilePath);
            console.log("🗑️ Local file cleaned up after error");
        }

        return null;
    }
};

export { uploadOnCloudinary, createUserFolder, uploadToUserFolder };
