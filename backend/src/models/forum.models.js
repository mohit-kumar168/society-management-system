import mongoose, { Schema } from "mongoose";

const forumSchema = new Schema(
    {
        society: {
            type: Schema.Types.ObjectId,
            ref: "Society",
            required: true,
        },
        posted_by: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        title: {
            type: String,
        },
        content: {
            type: String,
        },
        sentiment_score: {
            type: Number,
        },
    },
    { timestamps: true }
);

export const Forum = mongoose.model("Forum", forumSchema);
