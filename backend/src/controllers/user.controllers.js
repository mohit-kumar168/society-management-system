import fs from "fs";
import jwt from "jsonwebtoken";
import { User } from "../models/user.models.js";
import { apiError } from "../utils/apiError.js";
import { apiResponse } from "../utils/apiResponse.js";
import { handleRoleBasedRegistration } from "../utils/userRegistration.js";
import { options } from "../contants.js";
import {
    removeFromCloudinary,
    uploadToUserFolder,
} from "../utils/cloudinary.js";

const generateAccessAndRefreshTokens = async (userId) => {
    try {
        const user = await User.findById(userId);
        const accessToken = await user.generateAccessToken();
        const refreshToken = await user.generateRefreshToken();

        // Save refresh token to database
        user.refreshToken = refreshToken;
        await user.save({ validateBeforeSave: false });

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
            [firstName, email, password, role].some(
                (field) => !field || field?.trim() === ""
            )
        ) {
            throw new apiError(400, "All fields are required");
        }

        // Get profile picture file
        const profilePictureFile = req.files?.profilePicture?.[0];

        const existingUser = await User.findOne({
            $or: [{ email }, { collegeId }],
        });
        if (existingUser) {
            if (profilePictureFile && fs.existsSync(profilePictureFile.path)) {
                fs.unlinkSync(profilePictureFile.path);
            }
            throw new apiError(400, "User with this email already exists");
        }

        const userData = {
            ...req.body,
            profilePicture: profilePictureFile?.path,
        };

        const registrationResult = await handleRoleBasedRegistration(userData);

        if (profilePictureFile && registrationResult.user) {
            try {
                const profilePictureUpload = await uploadToUserFolder(
                    profilePictureFile.path,
                    registrationResult.user._id.toString(),
                    registrationResult.user.role,
                    "profile_picture"
                );

                if (profilePictureUpload?.secure_url) {
                    await User.findByIdAndUpdate(
                        registrationResult.user._id,
                        {
                            profilePicture: profilePictureUpload.secure_url,
                        },
                        { new: true }
                    );

                    registrationResult.user.profilePicture =
                        profilePictureUpload.secure_url;
                }
            } catch (uploadError) {
                console.error("❌ Profile picture upload failed:", uploadError);
            }
        } else {
            if (!profilePictureFile) {
                console.log("ℹ️ No profile picture file to upload");
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

        // Clean up uploaded file if registration failed
        const profilePictureFile = req.files?.profilePicture?.[0];
        if (profilePictureFile && fs.existsSync(profilePictureFile.path)) {
            try {
                fs.unlinkSync(profilePictureFile.path);
            } catch (cleanupError) {
                console.error("❌ Failed to clean up file:", cleanupError);
            }
        }

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

        return res
            .status(200)
            .cookie("accessToken", accessToken, options)
            .cookie("refreshToken", refreshToken, options)
            .json(
                new apiResponse(
                    200,
                    {
                        user: {
                            id: user._id,
                            email: user.email,
                            fullName: user.fullName,
                            role: user.role,
                        },
                        accessToken,
                        refreshToken,
                    },
                    "User logged in successfully"
                )
            );
    } catch (error) {
        throw new apiError(error.statusCode || 500, error.message);
    }
};

const logoutUser = async (req, res) => {
    try {
        await User.findByIdAndUpdate(
            req.user._id,
            {
                $set: {
                    refreshToken: null,
                },
            },
            { new: true }
        );

        return res
            .status(200)
            .clearCookie("accessToken", options)
            .clearCookie("refreshToken", options)
            .json(new apiResponse(200, {}, "User logged out successfully"));
    } catch (error) {
        throw new apiError(error.statusCode || 500, error.message);
    }
};

const refreshAccessToken = async (req, res) => {
    try {
        const incomingRefreshToken =
            req.cookies.refreshToken || req.body.refreshToken;
        if (!incomingRefreshToken) {
            throw new apiError(401, "Unauthorized request");
        }

        const decodedToken = jwt.verify(
            incomingRefreshToken,
            process.env.REFRESH_TOKEN_SECRET
        );

        const user = await User.findById(decodedToken._id);
        if (!user) {
            throw new apiError(404, "Invalid refresh token");
        }

        if (user?.refreshToken !== incomingRefreshToken) {
            throw new apiError(401, "Invalid refresh token");
        }

        const { accessToken, newRefreshToken } =
            await generateAccessAndRefreshTokens(user._id);

        // Update user's refresh token in database
        await User.findByIdAndUpdate(user._id, {
            refreshToken: newRefreshToken,
        });

        return res
            .status(200)
            .cookie("accessToken", accessToken, options)
            .cookie("refreshToken", newRefreshToken, options)
            .json(
                new apiResponse(
                    200,
                    { accessToken, refreshToken: newRefreshToken },
                    "Access token refreshed successfully"
                )
            );
    } catch (error) {
        throw new apiError(
            error.statusCode || 500,
            error.message || "Failed to refresh access token"
        );
    }
};

const updateCurrentUserPassword = async (req, res) => {
    try {
        const { currentPassword, newPassword } = req.body;
        const user = await User.findById(req.user._id);
        const isCurrentPasswordValid =
            await user.isPasswordCorrect(currentPassword);
        if (!isCurrentPasswordValid) {
            throw new apiError(400, "Current password is incorrect");
        }

        user.password = newPassword;
        await user.save({ validateBeforeSave: false });

        return res
            .status(200)
            .json(new apiResponse(200, {}, "Password updated successfully"));
    } catch (error) {
        throw new apiError(
            error.statusCode || 500,
            error.message || "Failed to update password"
        );
    }
};

const getCurrentUser = async (req, res) => {
    return res
        .status(200)
        .json(new apiResponse(200, req.user, "Current user details fetched"));
};

const updateAccountDetails = async (req, res) => {
    try {
        const { firstName, lastName, email } = req.body;
        if (!firstName || !lastName || !email) {
            throw new apiError(
                400,
                "First name, last name, and email are required"
            );
        }
        const user = await User.findByIdAndUpdate(
            req.user._id,
            {
                $set: {
                    "fullName.firstName": firstName,
                    "fullName.lastName": lastName,
                    email: email,
                },
            },
            { new: true }
        ).select("-password -refreshToken");

        return res
            .status(200)
            .json(
                new apiResponse(
                    200,
                    user,
                    "Account details updated successfully"
                )
            );
    } catch (error) {
        throw new apiError(
            error.statusCode || 500,
            error.message || "Failed to update account details"
        );
    }
};

const updateProfilePicture = async (req, res) => {
    try {
        const profilePictureLocalPath = req.file?.path;
        if (!profilePictureLocalPath) {
            throw new apiError(400, "Profile picture file is required");
        }

        const user = await User.findById(req.user._id).select(
            "-password -refreshToken"
        );

        const profilePicture = await uploadToUserFolder(
            profilePictureLocalPath,
            user._id,
            user.role,
            "updated_profile_picture"
        );
        if (!profilePicture) {
            throw new apiError(500, "Failed to upload profile picture");
        }
        await User.findByIdAndUpdate(
            user._id,
            {
                $set: {
                    profilePicture: profilePicture.secure_url,
                },
            },
            { new: true }
        );
        await removeFromCloudinary(user.profilePicture);
        return res
            .status(200)
            .json(
                new apiResponse(
                    200,
                    { profilePicture: profilePicture.secure_url },
                    "Profile picture updated successfully"
                )
            );
    } catch (error) {
        throw new apiError(
            error.statusCode || 500,
            error.message || "Failed to update profile picture"
        );
    }
};

export {
    registerUser,
    loginUser,
    logoutUser,
    refreshAccessToken,
    updateCurrentUserPassword,
    getCurrentUser,
    updateAccountDetails,
    updateProfilePicture,
};
