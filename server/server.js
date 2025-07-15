import express from "express"
import dotenv from 'dotenv';
dotenv.config();
import cors from "cors"
import connectDB from "./configs/db.js";
import { clerkMiddleware } from '@clerk/express'
import clerkWebhooks from "./controllers/clerkWebHooks.js";
import userRouter from "./routes/userRoutes.js";
import hotelRouter from "./routes/hotelRoutes.js";
import connectCloudinary from "./configs/cloudinary.js";
import roomRouter from "./routes/roomRoutes.js";
import bookingRouter from "./routes/bookingRoutes.js";


connectDB()
connectCloudinary()

const PORT= process.env.PORT || 3000;

const app= express();
app.use(cors({
  origin: ['http://localhost:5173', 'https://roomzy099.vercel.app'],
  credentials: true, // if using cookies/auth
}));



//Middleware
app.use(express.json())
app.use(clerkMiddleware())

// Api to listen to clerk webhooks
app.use("/api/clerk",clerkWebhooks)


app.get('/',(req,res)=>{
    res.send("working hurr ")
});
app.use('/api/user',userRouter)
app.use('/api/hotels',hotelRouter)
app.use('/api/rooms',roomRouter)
app.use('/api/bookings',bookingRouter)

app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`)
});
