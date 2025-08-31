import mongoose, { Schema } from "mongoose";

const membershipSchema = new Schema(
    {
        user: { type: Schema.Types.ObjectId, ref: "User", required: true },
        society: {
            type: Schema.Types.ObjectId,
            ref: "Society",
            required: true,
        },
        roleInSociety: {
            type: String,
            enum: ["member", "leader", "convenor"],
            default: "member",
        }, // add
        status: {
            type: String,
            enum: ["pending", "approved", "rejected"],
            default: "pending",
        },
        joinedAt: { type: Date, default: Date.now },
    },
    { timestamps: true }
);

// Prevent duplicates
membershipSchema.index({ user: 1, society: 1 }, { unique: true });

export const Membership = mongoose.model("Membership", membershipSchema);
