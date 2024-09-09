import express from "express";
import { productControllers } from "../controllers/product.controller.js";
import { adminRoute, protectRoute } from "../middlewares/auth.middleware.js";

const router = express();
router.post("/create", protectRoute,adminRoute, productControllers.createProduct);

router.get("/", protectRoute, adminRoute, productControllers.getAllProduct)
router.get("/featured",  productControllers.featuredProduct);
router.get("/category/:category",  productControllers.getProductsByCategory);
router.get("/recommended",  productControllers.getRecommendedProduct);



router.post("/:id", protectRoute,adminRoute, productControllers.toggleFeaturedProduct);

router.delete("/:id", protectRoute,adminRoute, productControllers.deleteProduct);


export default router;