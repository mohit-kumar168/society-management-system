import fs from "fs";
import { User } from "../models/user.models.js";
import { apiError } from "../utils/apiError.js";
import { apiResponse } from "../utils/apiResponse.js";
import { handleRoleBasedRegistration } from "../utils/userRegistration.js";
import { uploadToUserFolder } from "../utils/cloudinary.js";

const generateAccessAndRefreshTokens = async (userId) => {
    try {
        const user = await User.findById(userId);
        const accessToken = await user.generateAccessToken();
        const refreshToken = await user.generateRefreshToken();

        return { accessToken, refreshToken };
    } catch (error) {
        throw new apiError(500, "Failed to generate tokens");
    }
};

const registerUser = async (req, res) => {
    try {
        const { firstName, lastName, email, password, collegeId, role } =
            req.body;

        if (!email || !password) {
            throw new apiError(400, "Email and password are required");
        }

        if (
            [firstName, email, password].some(
                (field) => !field || field?.trim() === ""
            )
        ) {
            throw new apiError(400, "All fields are required");
        }

        const existingUser = await User.findOne({
            $or: [{ email }, { collegeId }],
        });
        if (existingUser) {
            if (profilePictureFile) {
                fs.unlinkSync(profilePictureFile.path);
            }
            throw new apiError(400, "User with this email already exists");
        }

        let profilePictureFile = req.files?.profilePicture?.[0];
        console.log("🔍 File received:", profilePictureFile ? "Yes" : "No");
        console.log("🔍 req.files:", req.files);
        console.log("🔍 req.file:", req.file);

        if (profilePictureFile) {
            console.log("📁 File details:", {
                filename: profilePictureFile.filename,
                path: profilePictureFile.path,
                mimetype: profilePictureFile.mimetype,
                size: profilePictureFile.size,
            });
        }

        const userData = {
            ...req.body,
            profilePicture: profilePictureFile?.path,
        };

        const registrationResult = await handleRoleBasedRegistration(userData);
        console.log(
            "✅ User registration result:",
            registrationResult.user ? "Success" : "Failed"
        );

        if (profilePictureFile && registrationResult.user) {
            console.log("🚀 Starting Cloudinary upload...");
            try {
                const profilePictureUpload = await uploadToUserFolder(
                    profilePictureFile.path,
                    registrationResult.user._id.toString(),
                    registrationResult.user.role,
                    "profile_picture"
                );

                console.log(
                    "📤 Cloudinary upload result:",
                    profilePictureUpload
                );

                if (profilePictureUpload?.secure_url) {
                    console.log("🔄 Updating user with profile picture URL...");
                    const updatedUser = await User.findByIdAndUpdate(
                        registrationResult.user._id,
                        {
                            profilePicture: profilePictureUpload.secure_url,
                        },
                        {
                            new: true,
                        }
                    );

                    registrationResult.user.profilePicture =
                        profilePictureUpload.secure_url;
                    console.log("✅ Profile picture URL updated successfully");
                } else {
                    console.log("⚠️ No secure_url received from Cloudinary");
                }
            } catch (uploadError) {
                console.error("❌ Profile picture upload failed:", uploadError);
                console.error("📋 Error details:", {
                    message: uploadError.message,
                    stack: uploadError.stack,
                });
            }
        } else {
            if (!profilePictureFile) {
                console.log("ℹ️ No profile picture file to upload");
            }
            if (!registrationResult.user) {
                console.log(
                    "❌ User registration failed, skipping file upload"
                );
            }
        }

        return res
            .status(201)
            .json(
                new apiResponse(
                    201,
                    registrationResult.user,
                    registrationResult.message
                )
            );
    } catch (error) {
        console.error("❌ Registration failed:", error);
        console.error("📋 Error details:", {
            message: error.message,
            statusCode: error.statusCode,
            stack: error.stack,
        });
        throw new apiError(
            error.statusCode || 500,
            error.message || "Failed to register user"
        );
    }
};

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            throw new apiError(400, "Email and password are required");
        }

        const user = await User.findOne({ email }).select("+password");
        if (!user) {
            throw new apiError(401, "Invalid credentials");
        }

        // Check if user is active
        if (user.status !== "active") {
            throw new apiError(403, "Account is pending approval or inactive");
        }

        const isPasswordValid = await user.isPasswordCorrect(password);
        if (!isPasswordValid) {
            throw new apiError(401, "Invalid credentials");
        }

        const { accessToken, refreshToken } =
            await generateAccessAndRefreshTokens(user._id);

        const options = {
            httpOnly: true,
            secure: true,
        };

        return res
            .status(200)
            .cookie("accessToken", accessToken, options)
            .cookie("refreshToken", refreshToken, options)
            .json(
                new apiResponse(200, "User logged in successfully", {
                    user: {
                        id: user._id,
                        email: user.email,
                        fullName: user.fullName,
                        role: user.role,
                    },
                    accessToken,
                    refreshToken,
                })
            );
    } catch (error) {
        throw new apiError(error.statusCode || 500, error.message);
    }
};

export { registerUser, loginUser };
