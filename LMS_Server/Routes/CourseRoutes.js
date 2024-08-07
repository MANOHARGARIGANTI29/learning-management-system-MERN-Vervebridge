import express from "express";
import { addLecture, createCourses, deleteCourses, deleteLecture, getAllCourses,getCourseLectures } from "../Controllers/courseController.js";
import singleUpload from "../Middlewares/multer.js";
import { authorizeAdmin, authorizeSubscribers, isAuthenticated } from "../Middlewares/Auth.js";
const router = express.Router();

// Get all courses without lectures
router.route("/courses").get(getAllCourses);

// create new course - only admin
router.route("/createcourse").post(isAuthenticated, authorizeAdmin, singleUpload,createCourses);

// add lecture ,delete course,get course details
router.route("/course/:id").get(isAuthenticated,authorizeSubscribers, getCourseLectures).post(isAuthenticated,authorizeAdmin,singleUpload,addLecture).delete(isAuthenticated,authorizeAdmin,deleteCourses)
// delete lecture

router.route("/lecture").delete(isAuthenticated,authorizeAdmin,deleteLecture)
export default router;