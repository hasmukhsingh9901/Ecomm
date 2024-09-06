import express from "express";
import { cartController } from "../controllers/cart.controller.js";
import { protectRoute } from "../middlewares/auth.middleware.js";

const router = express();

router.get("/", protectRoute, cartController.getCartProducts);
router.post("/", protectRoute, cartController.addToCart);
router.delete("/", protectRoute, cartController.removeAllFromCart);
router.post("/:id", protectRoute, cartController.updateQuantity);

export default router;
