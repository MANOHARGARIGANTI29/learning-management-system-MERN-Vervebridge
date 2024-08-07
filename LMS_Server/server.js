import app from "./App.js";
import { connectDB } from "./Config/database.js";
import cloudinary from "cloudinary";
import dotenv from "dotenv";
import Razorpay from "razorpay";
import nodeCron from "node-cron";
import { Stats } from "./Models/Stats.js";
dotenv.config();
connectDB();
// garigantimanohar29
// cbMJwhBDicuwVhsK

cloudinary.v2.config({
    cloud_name:process.env.CLOUDINARY_CLIENT_NAME,
    api_key:process.env.CLOUDINARY_CLIENT_API_KEY,
    api_secret:process.env.CLOUDINARY_CLIENT_SECRET,
});


export const instance = new Razorpay({
    key_id:process.env.RAZORPAY_API_KEY,
    key_secret:process.env.RAZORPAY_API_SECRET,
});

nodeCron.schedule("0 0 0 1 * *",async()=>{
    try{
        await Stats.create({
            
        });
    }catch(error){
      console.log(error);
    }
})
app.listen(process.env.PORT,()=>{
    console.log(`server is working on port:${process.env.PORT}`);
});