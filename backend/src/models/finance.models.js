import mongoose, { Schema } from "mongoose";

const financeSchema = new Schema(
    {
        society: {
            type: Schema.Types.ObjectId,
            ref: "Society",
            required: true,
        },
        type: {
            type: String,
            enum: ["income", "expense"],
            required: true,
        },
        amount: {
            type: Number,
            required: true,
        },
        description: {
            type: String,
        },
        source: {
            type: String,
        },
        status: {
            type: String,
            enum: ["pending", "approved"],
            default: "pending",
        },
        requested_by: {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
        approved_by: {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
    },
    { timestamps: true }
);

export const Finance = mongoose.model("Finance", financeSchema);
