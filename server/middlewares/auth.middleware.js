import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

// Middleware to protect routes by verifying JWT token
export const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.accessToken;  // Fetch token from cookies

    // Check if token exists
    if (!token) {
      return res.status(401).json({ message: "Authorization required, token missing" });
    }

    // Verify token and extract payload
    const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);

    // Find user by decoded ID
    const user = await User.findById(decoded.userId);

    // If no user found, return error
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    // Attach user to request object for further use
    req.user = user;

    // Proceed to the next middleware
    next();
  } catch (error) {
    // Handle expired or invalid token errors
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token has expired, please login again" });
    }

    console.error("Authorization error:", error.message);
    return res.status(401).json({ message: "Not authorized, invalid token" });
  }
};

// Middleware to check if user has admin role
export const adminRoute = (req, res, next) => {
  // Ensure the user is logged in and is an admin
  if (req.user && req.user.role === "admin") {
    return next();
  }

  // Return error if user is not an admin
  return res.status(403).json({ message: "Access denied, admin privileges required" });
};
