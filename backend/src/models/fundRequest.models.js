import mongoose, { Schema } from "mongoose";

const fundRequestSchema = new Schema(
    {
        society: {
            type: Schema.Types.ObjectId,
            ref: "Society",
            required: true,
        },
        amount: {
            type: Number,
            required: true,
        },
        reason: {
            type: String,
            required: true,
        },
        billUrl: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            enum: ["pending", "approved", "rejected"],
            default: "pending",
        },
    },
    { timestamps: true }
);

export const FundRequest = mongoose.model("FundRequest", fundRequestSchema);
