import mongoose, { Schema } from "mongoose";

const resourceSchema = new Schema(
    {
        type: {
            type: String,
            enum: ["venue", "equipment"],
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        location: {
            type: String,
        },
        availability_status: {
            type: String,
            enum: ["available", "booked"],
            default: "available",
        },
    },
    { timestamps: true }
);

export const Resource = mongoose.model("Resource", resourceSchema);
