
import jwt from "jsonwebtoken"
import { catchAsyncError } from "./catchAsyncErrors.js"
import ErrorHandler from "../Utils/errorHandler.js";
import { User } from "../Models/User.js";

export const isAuthenticated = catchAsyncError(async(req,res,next)=>{
    const {token} = req.cookies;
    if(!token) return next(new ErrorHandler("Not Logged In",401))
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        req.user = await User.findById(decoded._id)
        next();
})
export const authorizeSubscribers = (req, res, next) => {
    if (!req.user) {
        return next(new ErrorHandler("User not authenticated", 401));
    }
    if (!req.user.subscription || req.user.subscription.status !== "active") {
        if (req.user.role !== "admin") {
            return next(new ErrorHandler(`Only Subscribers can access this resource`, 403));
        }
    }
    next();
};

export const authorizeAdmin = (req,res,next)=>{
    if (!req.user) {
        return next(new ErrorHandler("User not authenticated", 401));
    }
    if(req.user.role!=="admin")
       return next(new ErrorHandler(`${req.user.role} is not allowed to access this resource`,403))
   next();
}