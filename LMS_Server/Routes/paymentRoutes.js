import express from "express";
import { isAuthenticated } from "../Middlewares/Auth.js";
import { buySubscription,paymentVerification,getRazorPayKey, cancelSubscription } from "../Controllers/PaymentController.js";

const router = express.Router();

// Buy Subscription
router.route("/subscribe").get(isAuthenticated,buySubscription);

//verify payment and save reference in database
router.route("/paymentverificcation").post(isAuthenticated,paymentVerification)

// get razorpay key
router.route("/razorpaykey").get(getRazorPayKey)

// cancel suubscription

router.route("/subscribe/cancel").delete(isAuthenticated,cancelSubscription)

export default router;