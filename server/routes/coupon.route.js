import express from "express";
import { adminRoute, protectRoute } from "../middlewares/auth.middleware.js";
import { couponController } from "../controllers/coupon.controller.js";

const router = express();


router.get("/",protectRoute,adminRoute,couponController.getCoupon);
router.get("/validate",protectRoute,adminRoute,couponController.validateCoupon);

export default router;
