import jwt from "jsonwebtoken";
import User from "../models/user.models.js";

export const isLoggedIn = async (req, res, next) => {
    try {
        const token = req.cookies.token;

        if (!token) {
            return res.status(401).json({ message: "Authentication required" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findOne({ email: decoded.email }).select("-password");

        if (!user) {
            return res.status(401).json({ message: "Invalid token or user does not exist" });
        }

        req.user = user;

        next();
    } catch (error) {
        console.log(error);
        return res.status(401).json({ message: "Authentication failed" });
    }
};
