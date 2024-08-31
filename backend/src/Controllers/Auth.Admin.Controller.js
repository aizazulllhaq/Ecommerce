import { JWT_SECRET } from "../constant.js";
import User from "../Models/User.Modal.js";
import ApiResponse from "../Utils/ApiResponse.js";
import wrapAsync from "../Utils/wrapAsync.js";
import jwt from "jsonwebtoken";

// /admin/signin : admin-login
export const adminSignin = wrapAsync(async (req, res, next) => {
  // Validation required fields ( email , password ); signInValidation => AuthValidation.js
  // get required fields
  const { email, password } = req.body;

  const isUser = await User.findOne({ email });
  if (!isUser) return next(new ApiError(false, 401, "Invalid Credentials"));

  const isPasswordMatch = await isUser.isPasswordCorrect(password);

  if (!isPasswordMatch)
    return next(new ApiError(false, 401, "Invalid Credentials"));

  if (isUser.role !== "ADMIN")
    return next(new ApiError(false, 400, "Admin Not Found"));

  const ADMaccessToken = await isUser.generateAccessToken();

  return res
    .status(200)
    .cookie("ADMaccessToken", ADMaccessToken, {
      httpOnly: true,
      SameSite: "none",
    })
    .json(
      new ApiResponse(true, "Login Successfull", {
        id: isUser._id,
        role: isUser.role,
      })
    );
});

// /admin/check : admin-auth-check
export const adminCheckAuthentication = wrapAsync(async (req, res, next) => {
  const ADMaccessToken = req.cookies?.ADMaccessToken;

  if (ADMaccessToken) {
    const admin = jwt.verify(ADMaccessToken, JWT_SECRET);
    if (admin.role !== "ADMIN")
      return next(new ApiError(false, 400, "Admin Not Found"));

    req.admin = admin;

    return res.status(200).json({
      id: admin.id,
      role: admin.role,
    });
  }

  return next(new ApiError(false, 401, "unAuthorized"));
});

