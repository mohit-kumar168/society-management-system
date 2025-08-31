import mongoose, { Schema } from "mongoose";

const eventRegistrationSchema = new Schema(
    {
        event: { type: Schema.Types.ObjectId, ref: "Event", required: true },

        // Optional linked platform user
        user: { type: Schema.Types.ObjectId, ref: "User", default: null },

        // Contact/snapshot details
        email: { type: String, required: true, lowercase: true, trim: true },
        fullName: {
            firstName: { type: String, required: true, trim: true },
            lastName: { type: String, trim: true, default: "" },
        },
        phoneNumber: { type: String, required: true, trim: true },
        collegeId: { type: String, required: true, trim: true },
        college: { type: String, required: true, trim: true },
        year: {
            type: String,
            required: true,
            enum: ["1st", "2nd", "3rd", "4th"],
        },

        // Payments snapshot at the time of registration
        amountDue: { type: Number, default: 0 }, // add
        currency: { type: String, default: "INR" }, // add
        paymentStatus: {
            type: String,
            enum: ["pending", "completed", "failed"],
            default: "pending",
        }, // fix default
        paymentId: { type: String, default: null }, // gateway transaction id or your Payment._id
        provider: {
            type: String,
            enum: ["stripe", "razorpay", null],
            default: null,
        }, // add

        registrationSource: {
            type: String,
            enum: ["platform", "external", "manual"],
            default: "external",
        },
        status: {
            type: String,
            enum: ["registered", "cancelled", "attended", "no-show"],
            default: "registered",
        },
    },
    { timestamps: true }
);

// Indexes (explicit)
eventRegistrationSchema.index({ event: 1, email: 1 }, { unique: true });
eventRegistrationSchema.index({ event: 1, status: 1 });
eventRegistrationSchema.index({ createdAt: -1 });

export const EventRegistration = mongoose.model(
    "EventRegistration",
    eventRegistrationSchema
);
