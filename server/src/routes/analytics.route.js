import express from "express";
import { adminRoute, protectRoute } from "../middlewares/auth.middleware.js";
import { analyticsController } from "../controllers/analytics.controller.js";

const router = express();

router.get("/", protectRoute,adminRoute,analyticsController.getAnalytics);

export default router;
