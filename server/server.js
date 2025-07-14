import express from "express";
import dotenv from 'dotenv';
dotenv.config();
import cors from "cors";
import connectDB from "./configs/db.js";
import { clerkMiddleware } from '@clerk/express';
import clerkWebhooks from "./controllers/clerkWebHooks.js";
import userRouter from "./routes/userRoutes.js";
import hotelRouter from "./routes/hotelRoutes.js";
import connectCloudinary from "./configs/cloudinary.js";
import roomRouter from "./routes/roomRoutes.js";
import bookingRouter from "./routes/bookingRoutes.js";
import cookieParser from 'cookie-parser';

// Connect DB & Cloudinary
connectDB();
connectCloudinary();

const PORT = process.env.PORT || 3000;
const app = express();

// ✅ Define allowed origins
const allowedOrigins = [
  'http://localhost:5173',
  'https://roomzy098.vercel.app',
  'https://roomzy-hotel-booking-frontend-manhiks-projects.vercel.app'
];

// ✅ Configure CORS
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions)); // ← Handle pre-flight requests properly

// ✅ Middlewares
app.use(cookieParser());
app.use(express.json());

// ✅ Public route
app.get('/', (req, res) => {
  res.send("working hurr");
});

// ✅ Webhook (public)
app.use("/api/clerk", clerkWebhooks);

// ✅ Protected routes
app.use("/api/user", clerkMiddleware(), userRouter);
app.use("/api/bookings", clerkMiddleware(), bookingRouter);

// ✅ Public routes
app.use("/api/hotels", hotelRouter);
app.use("/api/rooms", roomRouter);

// ✅ Start server
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
