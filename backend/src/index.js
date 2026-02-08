import express from "express";
import dotenv from "dotenv"
import cookieParser from "cookie-parser"

import { connectDB } from "./lib/db.js"
import authRoutes from "./routes/auth.route.js"

dotenv.config()
const app = express();
const PORT = process.env.PORT

app.use(express.json()) // allow to extract json data out of body
app.use(cookieParser()) // allow to parse the cookies

app.use("/api/auth", authRoutes)

app.listen(PORT, () => {
    console.log("Server is running on PORT:" + PORT);
    connectDB()
})