import express from "express"
import dotenv from 'dotenv';
dotenv.config();
import cors from "cors"
import connectDB from "./configs/db.js";
import { clerkMiddleware } from '@clerk/express'
import clerkWebhooks from "./controllers/clerkWebHooks.js";


connectDB()

const PORT= process.env.PORT || 3000;

const app= express();
app.use(cors())        // Allow backend to connect with any frontend. cross-origin resource sharing


//Middleware
app.use(express.json())
app.use(clerkMiddleware())

// Api to listen to clerk webhooks
app.use("/api/clerk",clerkWebhooks)


app.get('/',(req,res)=>{
    res.send("working hurr ")
});

app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`)
});
