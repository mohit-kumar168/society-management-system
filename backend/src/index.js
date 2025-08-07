import app from "./app.js";
import connectDB from "./db/db.js";

const PORT = process.env.PORT || 3000;

connectDB()
    .then(() => {
        app.on("error", (error) => {
            console.error("Error connecting to the database:", error.message);
            throw error;
        });
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.error("MongoDB connection failed:", error.message);
    });
