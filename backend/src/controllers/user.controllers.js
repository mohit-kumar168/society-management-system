import { User } from "../models/user.models.js";
import { apiError } from "../utils/apiError.js";

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
    const {
        fullName: { firstName, lastName },
        email,
        password,
    } = req.body;
};

export { registerUser };
