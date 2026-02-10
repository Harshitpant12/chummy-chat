import express from "express";
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
import cors from "cors"
import path from "path";

import { connectDB } from "./lib/db.js"
import authRoutes from "./routes/auth.route.js"
import messageRoutes from "./routes/message.route.js"
import { app, server } from "./lib/socket.js";

dotenv.config()

const PORT = process.env.PORT
const __dirname = path.resolve()

app.use(express.json({ limit: "10mb" })); // to increase data limit specially for image
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
// allow to extract json data out of body
app.use(cookieParser()) // allow to parse the cookies
app.use(cors(
    {
        origin: "http://localhost:5173",
        credentials: true
    }
))

app.use("/api/auth", authRoutes)
app.use("/api/messages", messageRoutes)

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../frontend/dist")))

    app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"))
    })
}

const startServer = async () => {
    try {
        await connectDB(); // Wait for DB
        server.listen(PORT, () => {
            console.log("Server running on PORT:", PORT);
        });
    } catch (error) {
        console.error("Failed to start server:", error);
        process.exit(1);
    }
};

startServer();