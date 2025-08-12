import mongoose, { Schema } from "mongoose";

const eventRegistrationSchema = new Schema(
    {
        event: {
            type: Schema.Types.ObjectId,
            ref: "Event",
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
        ticketType: {
            type: String,
            enum: ["free", "paid"],
            default: "free",
        },
        paymentStatus: {
            type: String,
            enum: ["pending", "completed", "failed"],
            default: "pending",
        },
        registeredAt: {
            type: Date,
            default: Date.now,
        },
    },
    { timestamps: true }
);

export const EventRegistration = mongoose.model(
    "EventRegistration",
    eventRegistrationSchema
);
