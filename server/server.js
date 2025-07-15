import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

import connectDB from "./configs/db.js";
import connectCloudinary from "./configs/cloudinary.js";

import { clerkMiddleware } from "@clerk/express";
import clerkWebhooks from "./controllers/clerkWebHooks.js";

import userRouter from "./routes/userRoutes.js";
import hotelRouter from "./routes/hotelRoutes.js";
import roomRouter from "./routes/roomRoutes.js";
import bookingRouter from "./routes/bookingRoutes.js";

dotenv.config();
connectDB();
connectCloudinary();

const app = express();
const PORT = process.env.PORT || 3000;

// ✅ Allow frontend domain for CORS
const allowedOrigins = [
  "http://localhost:5173",
  "https://roomzy098.vercel.app"
];

app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  if (req.method === "OPTIONS") return res.sendStatus(200);
  next();
});

// 🔑 Required for session tokens/cookies
app.use(cookieParser());
app.use(express.json());

// ✅ Clerk middleware (must come before protected routes)
app.use(clerkMiddleware());

// 👇 Routes
app.get("/", (req, res) => {
  res.send("working hurr");
});

app.use("/api/clerk", clerkWebhooks);
app.use("/api/user", userRouter);
app.use("/api/hotels", hotelRouter);
app.use("/api/rooms", roomRouter);
app.use("/api/bookings", bookingRouter);

// ✅ Vercel doesn't need app.listen (only for local dev)
if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

export default app;
