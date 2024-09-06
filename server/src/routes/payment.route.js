import express from "express";
import { paymentController } from "../controllers/payment.controller.js";
import { protectRoute } from "../middlewares/auth.middleware.js";

const router = express();

router.post(
  "/create-checkout-session",
  protectRoute,
  paymentController.createCheckoutSession
);
router.post(
  "/checkout-success",
  protectRoute,
  paymentController.checkoutSuccess
);

export default router;
