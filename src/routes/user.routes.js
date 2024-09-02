import express from "express";
import { isLoggedIn } from "../middlewares/isLoggedIn.js";
import { login, logout, signup } from "../controllers/auth.controllers.js";

const router = express.Router();

router.post("/register", signup);
router.post("/login", login);
router.get("/logout", logout);

export default router;
