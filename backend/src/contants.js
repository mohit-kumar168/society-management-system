export const DB_NAME = "smsDB";

export const options = {
    httpOnly: true,
    secure: false, // Set to false for development (localhost)
    sameSite: "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    path: "/", // Ensure cookies are available for all paths
};
