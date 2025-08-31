import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const socialLinksSchema = new Schema(
    {
        linkedin: String,
        github: String,
        instagram: String,
        twitter: String,
        website: String,
    },
    { _id: false }
);

const userSchema = new Schema(
    {
        fullName: {
            firstName: { type: String, required: true, trim: true },
            lastName: { type: String, trim: true, default: "" },
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true,
        },
        password: { type: String, required: true, minlength: 6, select: false }, // hide by default
        role: {
            type: String,
            enum: ["admin", "convenor", "leader", "member"],
            required: true,
        },
        status: {
            type: String,
            enum: ["active", "inactive", "pending"],
            default: "active",
        },
        profilePicture: { type: String, default: null },
        collegeId: { type: String, unique: true, required: true },
        socialLinks: socialLinksSchema,
        refreshToken: { type: String, default: null, select: false },

        // Useful for future features
        lastLoginAt: { type: Date, default: null },
        lastSeenAt: { type: Date, default: null }, // chat presence snapshot
        failedLoginCount: { type: Number, default: 0 },
        membershipStatus: {
            type: String,
            enum: ["none", "active", "expired"],
            default: "none",
        },
    },
    { timestamps: true }
);

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

userSchema.methods.isPasswordCorrect = async function (password) {
    // password field is select:false, ensure this.password is loaded if needed
    return bcrypt.compare(password, this.password);
};

userSchema.methods.generateAccessToken = function () {
    return jwt.sign(
        { _id: this._id, email: this.email, role: this.role },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
        }
    );
};

userSchema.methods.generateRefreshToken = function () {
    return jwt.sign({ _id: this._id }, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
    });
};

userSchema.set("toJSON", {
    transform: function (doc, ret) {
        delete ret.password;
        delete ret.refreshToken;
        return ret;
    },
});

export const User = mongoose.model("User", userSchema);
