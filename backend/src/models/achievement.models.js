import mongoose, { Schema } from "mongoose";

const achievementSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        event: {
            type: Schema.Types.ObjectId,
            ref: "Event",
            default: null,
        },
        title: {
            type: String,
            required: true,
            trim: true,
        },
        description: {
            type: String,
            required: true,
        },
        issuedBy: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

// Virtual for achievement age
achievementSchema.virtual("daysAgo").get(function () {
    const now = new Date();
    const created = new Date(this.createdAt);
    const diffTime = now - created;
    return Math.floor(diffTime / (1000 * 60 * 60 * 24));
});

achievementSchema.set("toJSON", { virtuals: true });
achievementSchema.set("toObject", { virtuals: true });

export const Achievement = mongoose.model("Achievement", achievementSchema);
