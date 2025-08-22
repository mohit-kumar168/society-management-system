import { User } from "../models/user.models.js";
import { apiError } from "./apiError.js";
import { createUser } from "./user.js";

const handleRoleBasedRegistration = async (userData) => {
    const { role } = userData;

    switch (role) {
        case "admin":
            return await registerAdmin(userData);

        case "convenor":
            return await registerConvenor(userData);

        case "leader":
            return await registerLeader(userData);

        case "member":
            return await registerMember(userData);

        default:
            throw new apiError(
                400,
                "Invalid role. Allowed roles: admin, convenor, leader, member"
            );
    }
};

const registerAdmin = async (userData) => {
    const existingAdmin = await User.findOne({ role: "admin" });
    if (existingAdmin) {
        throw new apiError(
            400,
            "Admin is already exists. Only one admin is allowed"
        );
    }

    const user = await createUser({
        ...userData,
        role: "admin",
        status: "active",
    });

    return {
        message: "Admin registered successfully",
        user,
    };
};

const registerConvenor = async (userData, currentUser) => {
    if (!currentUser || currentUser.role !== "admin") {
        throw new apiError(403, "Only admin can register convenor");
    }

    const user = await createUser({
        ...userData,
        role: "convenor",
        status: "active",
    });

    return {
        message: "Convenor registered successfully",
        user,
    };
};

const registerLeader = async (userData, currentUser) => {
    if (!currentUser || !["admin", "convenor"].includes(currentUser.role)) {
        throw new apiError(403, "Only admin or convenor can register leader");
    }

    const user = await createUser({
        ...userData,
        role: "leader",
        status: "active",
    });

    return {
        message: "Leader registered successfully",
        user,
    };
};

const registerMember = async (userData) => {
    const user = await createUser({
        ...userData,
        role: "member",
        status: "pending",
    });

    return {
        message: "Member registration submitted. Awaiting admin approval.",
        user,
    };
};

export { handleRoleBasedRegistration };
