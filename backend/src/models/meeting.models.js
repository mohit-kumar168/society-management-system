import mongoose, { Schema } from "mongoose";

const meetingSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
        },
        convenor: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        society: {
            type: Schema.Types.ObjectId,
            ref: "Society",
            required: true,
        },
        agenda: {
            type: String,
            required: true,
        },
        meetingDate: {
            type: Date,
            required: true,
        },
        time: {
            type: String,
            required: true,
        },
        location: {
            type: String,
            required: true,
        },
        attendees: [
            {
                type: Schema.Types.ObjectId,
                ref: "User",
            },
        ],
    },
    {
        timestamps: true,
    }
);

export const Meeting = mongoose.model("Meeting", meetingSchema);
