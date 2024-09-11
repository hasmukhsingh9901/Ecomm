import express from "express";
import { authController, getProfile, refreshToken } from "../controllers/auth.controller.js";

const router = express();

router.post("/signup", authController.signUp);
router.post("/login", authController.login);
router.post("/logout", authController.logOut);
router.post("/refresh-token",refreshToken)
router.get("/profile",getProfile)

export default router;
