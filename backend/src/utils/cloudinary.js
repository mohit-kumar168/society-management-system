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

const removeFromCloudinary = async (cloudinaryUrl, resourceType = "image") => {
    try {
        if (!cloudinaryUrl) return null;
        const parts = cloudinaryUrl.split("/");
        const uploadIdx = parts.findIndex((part) => part === "upload");
        const publicId = parts
            .slice(uploadIdx + 1)
            .join("/")
            .split(".")[0];

        const response = await cloudinary.uploader.destroy(publicId, {
            resource_type: resourceType,
        });

        return response;
    } catch (error) {
        console.error("❌ Error removing from Cloudinary:", error);
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
        if (!localFilePath) {
            return null;
        }

        const userFolderPath = `sms/users/${userRole}_${userId}`;

        const response = await cloudinary.uploader.upload(localFilePath, {
            folder: userFolderPath,
            resource_type: "auto",
            public_id: fileName,
            overwrite: true,
        });

        fs.unlinkSync(localFilePath);
        return response;
    } catch (error) {
        if (fs.existsSync(localFilePath)) {
            fs.unlinkSync(localFilePath);
        }

        return null;
    }
};

export {
    uploadOnCloudinary,
    removeFromCloudinary,
    createUserFolder,
    uploadToUserFolder,
};
