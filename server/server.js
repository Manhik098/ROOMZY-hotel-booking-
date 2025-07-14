import express from "express"
import dotenv from 'dotenv'
dotenv.config()
import cors from "cors"
import cookieParser from 'cookie-parser'
import connectDB from "./configs/db.js"
import connectCloudinary from "./configs/cloudinary.js"

import { clerkMiddleware, ClerkExpressRequireAuth } from '@clerk/express'
import clerkWebhooks from "./controllers/clerkWebHooks.js"

import userRouter from "./routes/userRoutes.js"
import hotelRouter from "./routes/hotelRoutes.js"
import roomRouter from "./routes/roomRoutes.js"
import bookingRouter from "./routes/bookingRoutes.js"

const app = express()

connectDB()
connectCloudinary()

const PORT = process.env.PORT || 3000

app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://roomzy098.vercel.app',
    'https://roomzy-hotel-booking-frontend-manhiks-projects.vercel.app'
  ],
  credentials: true
}))

app.use(cookieParser())
app.use(express.json())
app.use(clerkMiddleware())  // Optional

// Webhook route (Clerk needs this)
app.use("/api/clerk", clerkWebhooks)

// Public routes (No auth required)
app.use('/api/hotels', hotelRouter)
app.use('/api/rooms', roomRouter)

// Private routes (Require Clerk auth)
app.use('/api/user', ClerkExpressRequireAuth(), userRouter)
app.use('/api/bookings', ClerkExpressRequireAuth(), bookingRouter)

app.get('/', (req, res) => {
  res.send("working hurr ")
})

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`)
})
