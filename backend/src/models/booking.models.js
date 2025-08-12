import mongoose, { Schema } from "mongoose";

const bookingSchema = new Schema(
    {
        resource: {
            type: Schema.Types.ObjectId,
            ref: "Resource",
            required: true,
        },
        society: {
            type: Schema.Types.ObjectId,
            ref: "Society",
            required: true,
        },
        event: {
            type: Schema.Types.ObjectId,
            ref: "Event",
        },
        requested_by: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        approved_by: {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
        status: {
            type: String,
            enum: ["pending", "approved", "declined"],
            default: "pending",
        },
        booked_from: {
            type: Date,
            required: true,
        },
        booked_to: {
            type: Date,
            required: true,
        },
    },
    { timestamps: true }
);

export const Booking = mongoose.model("Booking", bookingSchema);
