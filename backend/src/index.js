import express from "express";
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
import cors from "cors"

import { connectDB } from "./lib/db.js"
import authRoutes from "./routes/auth.route.js"
import messageRoutes from "./routes/message.route.js"

dotenv.config()
const app = express();
const PORT = process.env.PORT

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

app.listen(PORT, () => {
    console.log("Server is running on PORT:" + PORT);
    connectDB()
})