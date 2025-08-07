import mongoose, { Schema } from "mongoose";

const bookingSchema = new mongoose.Schema(
    {
        societyId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Society",
            required: true,
        },
        spaceType: {
            type: String,
            enum: [
                "Amphitheater",
                "Seminar Hall",
                "Auditorium",
                "Open Ground",
                "Other",
            ],
            required: true,
        },
        reason: {
            type: String,
            enum: [
                "Competition",
                "Rehearsal",
                "Workshop",
                "Seminar",
                "Orientation",
                "Meeting",
                "Other",
            ],
            required: true,
        },
        description: {
            type: String,
            required: true,
            trim: true,
        },
        bookingDate: {
            type: Date,
            required: true,
        },
        startTime: {
            type: String, // or Date if you're storing datetime
            required: true,
        },
        endTime: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            enum: ["Pending", "Approved", "Rejected"],
            default: "Pending",
        },
    },
    {
        timestamps: true,
    }
);

export const Booking = mongoose.model("Booking", bookingSchema);
