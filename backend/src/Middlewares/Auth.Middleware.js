import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../constant.js";
import ApiError from "../Utils/ApiError.js";

export const checkForAuthentication = (req, res, next) => {
  // Extract tokens from cookies
  const accessToken = req.cookies?.accessToken;
  const ADMaccessToken = req.cookies?.ADMaccessToken;

  // Initialize user and admin to null
  req.user = null;
  req.admin = null;

  // Check for User Authentication first
  if (accessToken) {
    try {
      const user = jwt.verify(accessToken, JWT_SECRET);
      req.user = user;
    } catch (error) {
      return next(new ApiError(false, 400, "Invalid User Token"));
    }
  }

  // Check for Admin Authentication
  if (ADMaccessToken) {
    try {
      const admin = jwt.verify(ADMaccessToken, JWT_SECRET);
      req.admin = admin;
    } catch (error) {
      return next(new ApiError(false, 400, "Invalid Admin Token"));
    }
  }

  // If no tokens are found, proceed to unrestricted routes
  if (!req.user && !req.admin) {
    return next();
  }

  // Proceed to the next middleware
  next();
};

// Middleware to restrict routes to authenticated users with specific roles
export const restrictFromSecureRoutes = (role = []) => {
  return (req, res, next) => {
    // Ensure the user is authenticated
    if (!req.user) {
      return next(new ApiError(false, 401, "Please First Login"));
    }

    // Ensure the user's email is verified
    if (!req.user.isVerified) {
      return next(new ApiError(false, 400, "Please First verify your mail"));
    }

    // Ensure the user's role matches the allowed roles
    if (!role.includes(req.user.role)) {
      return next(new ApiError(false, 400, "Role Must be Request"));
    }

    // Proceed to the next middleware
    next();
  };
};

// Middleware to restrict routes to authenticated admins with specific roles
export const restrictUserFromAdminRoutes = (role = []) => {
  return (req, res, next) => {
    // Ensure the admin is authenticated
    if (!req.admin) {
      return next(new ApiError(false, 401, "Please First Login as Admin"));
    }

    // Ensure the admin's email is verified
    if (!req.admin.isVerified) {
      return next(new ApiError(false, 400, "Please First verify your mail"));
    }

    // Ensure the admin's role matches the allowed roles
    if (!role.includes(req.admin.role)) {
      return next(new ApiError(false, 400, "Role Must be Request"));
    }

    // Proceed to the next middleware
    next();
  };
};
