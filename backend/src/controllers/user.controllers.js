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
            if (req.file) {
                fs.unlinkSync(req.file.path);
            }
            throw new apiError(400, "User with this email already exists");
        }

        let profilePictureFile = req.file;

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
                }
            } catch (uploadError) {
                console.error("❌ Profile picture upload failed:", uploadError);
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
        console.error("❌ Profile picture upload failed:", error);
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
