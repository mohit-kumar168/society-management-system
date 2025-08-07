import mongoose, { Schema } from "mongoose";

const eventSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        society: {
            type: Schema.Types.ObjectId,
            ref: "Society",
        },
        won: {
            type: Boolean,
            default: false,
        },
        winDate: {
            type: Date,
            default: null,
        },
    },
    { timestamps: true }
);

export const Event = mongoose.model("Event", eventSchema);
