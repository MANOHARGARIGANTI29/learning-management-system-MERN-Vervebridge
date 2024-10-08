
import { totalmem } from "os";
import { catchAsyncError } from "../Middlewares/catchAsyncErrors.js"
import {Course} from "../Models/Course.js"
import getDataUri from "../Utils/dataUri.js";
import ErrorHandler from "../Utils/errorHandler.js";
import cloudinary from "cloudinary";
import { Stats } from "../Models/Stats.js";

export const getAllCourses =catchAsyncError(
    async (req,res,next)=>{

        const keyword = req.query.keyword || "";
        const category = req.query.category ||"";

        const courses = await Course.find({
            title:{
                $regex:keyword,
                $options:"i"
            },category:{
                  $regex:category,
                  $options:"i"
            }
        }).select("-lectures");
        res.status(200).json({
            success:true,
            courses,
        });
    
    }
)
export const createCourses =catchAsyncError(
    async (req,res,next)=>{


        const {title,description,category,createdBy}=req.body;
        if(!title||!description||!category||!createdBy)
        return next(new ErrorHandler("Please add all fields",400))
        const file = req.file;
        const fileUri = getDataUri(file);
        const mycloud = await cloudinary.v2.uploader.upload(fileUri.content);
        await Course.create({
            title,description,category,createdBy,
            poster:{
                public_id:mycloud.public_id,
                url:mycloud.secure_url,
            },
        });
        res.status(201).json({
            success:true,
            message:"Course Created Successfully. You can add lectures now .",
        });
    
    }
)

export const getCourseLectures = catchAsyncError(async (req, res, next) => {
    console.log('Fetching course lectures');
    console.log('Course ID:',req.params.id);
    const course = await Course.findById(req.params.id);
    if (!course) {
        console.log('Course not found');
        return next(new ErrorHandler("Course not found", 400));
    }
    course.views += 1;
    await course.save();
    console.log('Course found and views incremented');
    res.status(200).json({
        success: true,
        lectures: course.lectures,
    });
});


// max video size 100mb
export const addLecture = catchAsyncError(async(req,res,next)=>{
    const {id} = req.params;
    const {title,description} = req.body;
    // const file = req.file
    const course = await Course.findById(req.params.id)
    if(!course)  return next(new ErrorHandler("Course not found",400));
    const file = req.file;
        const fileUri = getDataUri(file);
        const mycloud = await cloudinary.v2.uploader.upload(fileUri.content,{
            resource_type:"video",
            
        });

    course.lectures.push({
        title,description,
        video:{
            public_id:mycloud.public_id,
            url:mycloud.secure_url,
        },
    });
    course.numOfVideos = course.lectures.length;
    await course.save();
    res.status(200).json({
        success:true,
        message:"Lectures added in Course"
    })
})


export const deleteCourses =catchAsyncError(
    async (req,res,next)=>{
        const {id}=req.params;
        const course = await Course.findById(id);
        if(!course)  return next(new ErrorHandler("Course not found",400));
        await cloudinary.v2.uploader.destroy(course.poster.public_id);
        for(let i = 0; i < course.lectures.length;i++){
            const singleLecture = course.lectures[i];
            await cloudinary.v2.uploader.destroy(singleLecture.video.public_id,{
                resource_type:"video"
            })
        }

       await course.deleteOne()

         
        res.status(200).json({
            success:true,
            message:"Course Deleted Successfully"
        })
    
    }
)
export const deleteLecture =catchAsyncError(
    async (req,res,next)=>{
        const {courseId,lectureId}=req.query;


        const course = await Course.findById(courseId);
        if(!course)  return next(new ErrorHandler("Course not found",400));
        const lecture = course.lectures.find((item)=>{
            if(item._id.toString() === lectureId.toString())return item;  
          });

          await cloudinary.v2.uploader.destroy(lecture.video.public_id,{
            resource_type:"video",
          })
         course.lectures=course.lectures.filter((item)=>{
           if(item._id.toString()!== lectureId.toString())return item;  
         });
         course.numOfVideos = course.lectures.length;
         await course.save();
        res.status(200).json({
            success:true,
            message:"Lecture Deleted Successfully"
        })
    
    }
)


Course.watch().on("change",async()=>{
    const stats = await Stats.find({}).sort({createdAt:"desc"}).limit(1);
    if(stats.length === 0){
        const newStats = new Stats({
            views:0,
            createdAt:new Date(Date.now()),
        });
        await newStats.save();
        return;
    }
    const courses = await Course.find({});
    const totalViews = courses.reduce((acc, course) => acc + course.views, 0);
   stats[0].views = totalViews;
   stats[0].createdAt = new Date(Date.now());

   await stats[0].save();

})