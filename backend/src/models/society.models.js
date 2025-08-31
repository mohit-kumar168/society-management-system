import mongoose, { Schema } from "mongoose";

const societySchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        description: {
            type: String,
            required: true,
        },
        logo_url: {
            type: String,
        },
        convenor: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        leader: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        members: [
            {
                type: Schema.Types.ObjectId,
                ref: "User",
            },
        ],
    },
    { timestamps: true }
);

export const Society = mongoose.model("Society", societySchema);
