import { User } from "../models/user.models.js";
import { Society } from "../models/society.models.js";
import { Task } from "../models/task.models.js";
import { Achievement } from "../models/achievement.models.js";
import { Announcement } from "../models/announcement.models.js";
import { Event } from "../models/event.models.js";
import { EventRegistration } from "../models/eventRegistration.models.js";
import { apiError } from "../utils/apiError.js";
import { apiResponse } from "../utils/apiResponse.js";

const getMemberOverview = async (req, res) => {
    try {
        const userId = req.user._id;
        const userSocieties = await Society.find({ members: userId }).select(
            "_id"
        );
        const societyIds = userSocieties.map((society) => society._id);

        const [
            mySocietiesCount,
            pendingTasksCount,
            inProgressTasksCount,
            completedTasksCount,
            myAchievementsCount,
            recentAnnouncementsCount,
            upcomingEventsCount,
            myEventRegistrationsCount,
        ] = await Promise.all([
            Society.countDocuments({ members: userId }),
            Task.countDocuments({ assignedTo: userId, status: "pending" }),
            Task.countDocuments({ assignedTo: userId, status: "in_progress" }),
            Task.countDocuments({ assignedTo: userId, status: "completed" }),
            Achievement.countDocuments({ user: userId }),
            Announcement.countDocuments({
                society: { $in: societyIds },
                createdAt: {
                    $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
                },
                visibility: "members",
            }),
            Event.countDocuments({
                $or: [
                    { visibility: "public" },
                    { society: { $in: societyIds }, visibility: "internal" },
                ],
                startDateTime: { $gte: new Date() },
            }),
            EventRegistration.countDocuments({
                user: userId,
                status: "registered",
            }),
        ]);

        const overview = {
            societies: mySocietiesCount,
            pendingTasks: pendingTasksCount,
            inProgressTasks: inProgressTasksCount,
            completedTasks: completedTasksCount,
            achievements: myAchievementsCount,
            recentAnnouncements: recentAnnouncementsCount,
            upcomingEvents: upcomingEventsCount,
            myEventRegistrations: myEventRegistrationsCount,
        };

        return res
            .status(200)
            .json(
                apiResponse(
                    200,
                    overview,
                    "Member overview fetched successfully"
                )
            );
    } catch (error) {
        console.error("❌ Error fetching member overview:", error);
        throw new apiError(500, "Failed to fetch member overview");
    }
};

const getMySocieties = async (req, res) => {
    try {
        const userId = req.user._id;
        const societies = await Society.find({ members: userId })
            .populate(
                "leader",
                "fullName.firstName fullName.lastName email profilePicture"
            )
            .populate(
                "convenor",
                "fullName.firstName fullName.lastName email profilePicture"
            );

        return res
            .status(200)
            .json(
                apiResponse(
                    200,
                    societies,
                    "Member societies fetched successfully"
                )
            );
    } catch (error) {
        throw new apiError(500, "Failed to fetch member societies");
    }
};

const getMyTaks = async (req, res) => {
    try {
        const userId = req.user._id;
        const { status, priority, society } = req.query;

        const filter = { assignedTo: userId };
        if (status) filter.status = status;
        if (priority) filter.priority = priority;
        if (society) filter.society = society;

        const [tasks, totalTasks] = await Promise.all([
            Task.find(filter)
                .populate(
                    "assignedBy",
                    "fullName.firstName fullName.lastName email"
                )
                .populate("society", "name logo")
                .sort({ dueDate: 1, priority: -1 }),
            Task.countDocuments(filter),
        ]);

        return res
            .status(200)
            .json(
                apiResponse(200, { tasks, totalTasks }, "Member tasks fetched")
            );
    } catch (error) {
        console.error("❌ Error fetching member tasks:", error);
        throw new apiError(500, "Failed to fetch member tasks");
    }
};

const updateTaksstatus = async (req, res) => {
    try {
        const { taskId } = req.params;
        const { status } = req.body;
        const userId = req.user._id;

        const task = await Task.findById(taskId);
        if (!task) {
            throw new apiError(404, "Task not found");
        }
        if (!task.assignedTo.equals(userId)) {
            throw new apiError(403, "Not authorized to update this task");
        }

        const validateStatuses = ["pending", "in_progress", "completed"];
        if (!validateStatuses.includes(status)) {
            throw new apiError(400, "Invalid status value");
        }

        task.status = status;
        if (status === "completed") {
            task.completedAt = new Date();
        } else {
            task.completedAt = null;
        }

        await task.save();

        const updatedTask = await Task.findById(taskId)
            .populate(
                "assignedBy",
                "fullName.firstName fullName.lastName email"
            )
            .populate("society", "name logo");

        return res
            .status(200)
            .json(
                apiResponse(
                    200,
                    updatedTask,
                    "Task status updated successfully"
                )
            );
    } catch (error) {
        console.error("❌ Error updating task status:", error);
        throw new apiError(500, "Failed to update task status");
    }
};
