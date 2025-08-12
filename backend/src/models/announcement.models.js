import mongoose, { Schema } from "mongoose";

const announcementSchema = new Schema(
    {
        society: {
            type: Schema.Types.ObjectId,
            ref: "Society",
            required: true,
        },
        postedBy: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
        content: {
            type: String,
            required: true,
        },
        visibility: {
            type: String,
            enum: ["public", "members"],
            default: "members",
        },
    },
    { timestamps: true }
);

export const Announcement = mongoose.model("Announcement", announcementSchema);
