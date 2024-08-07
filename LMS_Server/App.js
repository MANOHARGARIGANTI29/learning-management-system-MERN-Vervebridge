
import express from "express";
import bodyParser from "body-parser";
import {config} from "dotenv";
import ErrorMiddleware from "./Middlewares/Error.js";
import cookieParser from "cookie-parser";
config ({
    path:"./Config/config.env"
})
import cors from "cors";

const app = express();

// using Middlewares

app.use(express.json());
app.use(bodyParser.urlencoded({
    extended:true,
}));
app.use(cookieParser());
app.use(cors({
   origin :process.env.FRONTEND_URL,
   credentials:true,
   methods:["GET","POST","PUT","DELETE"],
}))
// Importing & Using Routes
import course from "./Routes/CourseRoutes.js"
import user from "./Routes/userRoutes.js"
import payment from "./Routes/paymentRoutes.js"
import other from "./Routes/otherRoutes.js"
app.use("/api/v1",course);
app.use("/api/v1",user);
app.use("/api/v1",payment);
app.use("/api/v1",other);
app.use(ErrorMiddleware);
app.get("/",(req,res)=>{
    res.send(`<h1>Site is Working. click <a href=${process.env.FRONTEND_URL}>here</a> to visit the frontend</h1>`)
})
export default app;


