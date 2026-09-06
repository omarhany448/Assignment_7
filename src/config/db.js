import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DB_URI);

        console.log("DB connected successfully 🌸");
    } catch (error) {
        console.log("Database connection failed:", error.message);
        process.exit(1);
    }
};