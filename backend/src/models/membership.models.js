import mongoose, { Schema } from "mongoose";

const membershipSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
        society: {
            type: Schema.Types.ObjectId,
            ref: "Society",
        },
        status: {
            type: String,
            enum: ["pending", "approved", "rejected"],
            default: "pending",
        },
        joinedAt: {
            type: Date,
            default: Date.now,
        },
    },
    { timestamps: true }
);

export const Membership = mongoose.model("Membership", membershipSchema);
