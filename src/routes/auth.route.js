import express from "express";
import { authController, refreshToken } from "../controllers/auth.controller.js";

const router = express();

router.post("/signup", authController.signUp);
router.post("/login", authController.signIn);
router.post("/logout", authController.logOut);
router.post("/refresh-token",refreshToken)

export default router;
