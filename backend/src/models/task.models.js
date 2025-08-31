import mongoose, { Schema } from "mongoose";

const taskSchema = new Schema(
    {
        title: { type: String, required: true, trim: true },
        description: { type: String, required: true },
        assignedTo: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        assignedBy: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        society: {
            type: Schema.Types.ObjectId,
            ref: "Society",
            required: true,
        },
        priority: {
            type: String,
            enum: ["low", "medium", "high"],
            default: "medium",
        },
        status: {
            type: String,
            enum: ["pending", "in_progress", "completed"],
            default: "pending",
        },
        dueDate: { type: Date, required: true },
    },
    { timestamps: true }
);

// Indexes (explicit)
taskSchema.index({ assignedTo: 1, status: 1 });
taskSchema.index({ assignedTo: 1, dueDate: 1 });
taskSchema.index({ society: 1, status: 1 });

taskSchema.virtual("isOverdue").get(function () {
    return this.dueDate < new Date() && this.status !== "completed";
});

taskSchema.virtual("daysRemaining").get(function () {
    const now = new Date();
    const due = new Date(this.dueDate);
    const diffTime = due - now;
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
});

taskSchema.set("toJSON", { virtuals: true });
taskSchema.set("toObject", { virtuals: true });

export const Task = mongoose.model("Task", taskSchema);
