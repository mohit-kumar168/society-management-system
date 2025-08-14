import { User } from "../models/user.models.js";
import { apiError } from "./apiError.js";

const createUser = async (userData) => {
    try {
        const user = await User.create({
            fullName: {
                firstName: userData.firstName || userData.fullName?.firstName,
                lastName: userData.lastName || userData.fullName?.lastName,
            },
            email: userData.email,
            password: userData.password,
            role: userData.role || "guest",
            status: userData.status || "pending",
            profilePicture: userData.profilePicture || null,
            collegeId: userData.collegeId,
            socialLinks: userData.socialLinks || null,
            refreshToken: userData.refreshToken || null,
        });

        const createdUser = await User.findById(user._id).select(
            "-password -refreshToken"
        );
        return createdUser;
    } catch (error) {
        throw new apiError(500, "Failed to create user");
    }
};

export { createUser };
