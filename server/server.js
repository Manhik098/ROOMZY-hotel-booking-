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

connectDB();
connectCloudinary();

const PORT = process.env.PORT || 3000;

const app = express();

// ✅ MANUAL CORS FIX (🔥 required on Vercel serverless)
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173'); // Change if needed
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', 'true');

  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }

  next();
});

// Optional: keep the cors middleware for local dev consistency
app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://roomzy098.vercel.app'
  ],
  credentials: true,
}));

app.use(cookieParser());
app.use(express.json());
app.use(clerkMiddleware());

// Clerk webhooks
app.use("/api/clerk", clerkWebhooks);

// Routes
app.get('/', (req, res) => {
  res.send("working hurr");
});

app.use('/api/user', userRouter);
app.use('/api/hotels', hotelRouter);
app.use('/api/rooms', roomRouter);
app.use('/api/bookings', bookingRouter);

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
