import express from "express";
import {changepassword, getMyProfile, register, updateProfile,updateProfilePicture,forgetPassword,resetPassword,addToPlaylist,removeFromplaylist, getAllUsers, updateUserRole, deleteUser, deleteMyProfile} from '../Controllers/userControllers.js'
import {login} from "../Controllers/userControllers.js"
import {logout} from "../Controllers/userControllers.js";
import { authorizeAdmin, isAuthenticated } from "../Middlewares/Auth.js";
import singleUpload from "../Middlewares/multer.js";
const router = express.Router();

// To register a new user
router.route("/register").post(singleUpload ,register);

// Login
router.route("/login").post(login);
// Logout

router.route("/logout").get(logout)
// Get my profile
router.route("/my_profile").get(isAuthenticated, getMyProfile)
//Delete my profile
router.route("/my_profile").delete(isAuthenticated, deleteMyProfile)
// ChangePassword
router.route("/changepassword").put(isAuthenticated,changepassword)
// UpdateProfile
router.route("/updateprofile").put(isAuthenticated,updateProfile)
// UpdateProfilePicture
router.route("/updateprofilepicture").put(isAuthenticated,singleUpload,updateProfilePicture)

// ForgetPassword
router.route("/forgetpassword").post(forgetPassword);
// ResetPassword
router.route("/resetpassword/:token").put(resetPassword);
// AddtoPlayList
router.route("/addtoplaylist").post(isAuthenticated,addToPlaylist);
// RemoveFromPlayList
router.route("/removefromplaylist").delete(isAuthenticated,removeFromplaylist);
// Admin Routes
router.route("/admin/users").get(isAuthenticated,authorizeAdmin,getAllUsers);

router.route("/admin/user/:id").put(isAuthenticated,authorizeAdmin,updateUserRole).delete(isAuthenticated,authorizeAdmin,deleteUser)
export default router;