import express from "express";
import { contact ,courseRequest,getDashboardStats} from "../Controllers/otherControllers.js";
import { authorizeAdmin, isAuthenticated } from "../Middlewares/Auth.js";


const router = express.Router();


// contact form
router.route("/contact").post(contact)
// request form
router.route("/courserequest").post(courseRequest)
// get admin dashboard stats
router.route("/admin/stats").get(isAuthenticated,authorizeAdmin,getDashboardStats)
export default router;