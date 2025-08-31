import mongoose, { Schema } from "mongoose";

const eventSchema = new Schema(
    {
        title: { type: String, required: true, trim: true },
        description: { type: String, required: true },
        society: {
            type: Schema.Types.ObjectId,
            ref: "Society",
            required: true,
        },
        startDateTime: { type: Date, required: true },
        endDateTime: { type: Date, required: true },
        timezone: { type: String, default: "Asia/Kolkata" }, // add
        venue: { type: String, required: true, trim: true },

        // Visibility for guest vs members dashboards
        visibility: {
            type: String,
            enum: ["public", "internal"],
            default: "public",
        }, // add

        // Ticketing/registration (existing)
        eventType: { type: String, enum: ["free", "paid"], default: "free" },
        ticketPrice: { type: Number, default: 0, min: 0 },
        maxAttendees: { type: Number, default: null },
        registrationRequired: { type: Boolean, default: true },
        registrationDeadline: { type: Date },

        status: {
            type: String,
            enum: ["draft", "published", "cancelled", "completed"],
            default: "draft",
        },
        eventCategory: {
            type: String,
            enum: [
                "workshop",
                "seminar",
                "competition",
                "cultural",
                "sports",
                "social",
                "other",
            ],
            default: "other",
        },
        tags: [{ type: String, trim: true }],
        eventImage: { type: String },
        isRecurring: { type: Boolean, default: false },
        createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true },

        // Google Calendar sync (add)
        syncEnabled: { type: Boolean, default: false },
        googleEventId: { type: String, default: null },
        googleCalendarId: { type: String, default: null },
        lastSyncedAt: { type: Date, default: null },
        syncVersion: { type: Number, default: 0 }, // bump when you push updates
    },
    { timestamps: true }
);

// Validation: end after start
eventSchema.pre("validate", function (next) {
    if (
        this.startDateTime &&
        this.endDateTime &&
        this.endDateTime <= this.startDateTime
    ) {
        return next(new Error("endDateTime must be after startDateTime"));
    }
    next();
});

// Query indexes (move from options to explicit indexes)
eventSchema.index({ society: 1, startDateTime: -1 });
eventSchema.index({ status: 1, startDateTime: 1 });
eventSchema.index({ eventCategory: 1 });
eventSchema.index({ tags: 1 });
eventSchema.index({ visibility: 1, startDateTime: 1 });

// Registration count virtual (OK)
eventSchema.virtual("registrationCount", {
    ref: "EventRegistration",
    localField: "_id",
    foreignField: "event",
    count: true,
});

// isFull depends on registrationCount only when populated
eventSchema.virtual("isFull").get(function () {
    if (!this.maxAttendees) return false;
    if (typeof this.registrationCount !== "number") return false;
    return this.registrationCount >= this.maxAttendees;
});

// Ensure virtuals in output
eventSchema.set("toJSON", { virtuals: true });
eventSchema.set("toObject", { virtuals: true });

export const Event = mongoose.model("Event", eventSchema);
