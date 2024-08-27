import { JWT_SECRET } from "../constant.js";
import User from "../Models/User.Modal.js";
import ApiError from "../Utils/ApiError.js";
import ApiResponse from "../Utils/ApiResponse.js";
import generateRandomToken from "../Utils/randomTokenGenerator.js";
import { sendForgotPasswordMail } from "../Utils/sendMail.js";
import wrapAsync from "../Utils/wrapAsync.js";
import jwt from "jsonwebtoken";

// api/v1/users

// /signup :
export const signUp = wrapAsync(async (req, res, next) => {
  // Validate required fields; signUpValidation.js
  // get (name,email,password,)
  const { name, email, password } = req.body;
  // const profileImg = req.file;

  // check if account exists with this email;
  const isUser = await User.findOne({ email });

  if (isUser) return next(new ApiError(false, 400, "User already Exists"));

  // const result = await uploadOnCloudinary(profileImg.path);

  const newUser = new User({
    name,
    email,
    password,
    // profileImg: result.secure_url,
    role: "NORMAL",
    isVerified: true,
  });

  await newUser.save();
  const accessToken = await newUser.generateAccessToken();

  return res
    .status(201)
    .cookie("accessToken", accessToken, {
      httpOnly: true,
      SameSite: "none",
    })
    .json(
      new ApiResponse(true, "User Created Successfull", {
        id: newUser._id,
        role: newUser.role,
      })
    );
});

// /signin :
export const signIn = wrapAsync(async (req, res, next) => {
  // Validation required fields ( email , password ); signInValidation => AuthValidation.js
  // get required fields
  const { email, password } = req.body;

  const isUser = await User.findOne({ email });

  if (!isUser) return next(new ApiError(false, 401, "Invalid Credentials"));

  const isPasswordMatch = await isUser.isPasswordCorrect(password);

  if (!isPasswordMatch)
    return next(new ApiError(false, 401, "Invalid Credentials"));

  const accessToken = await isUser.generateAccessToken();

  return res
    .status(200)
    .cookie("accessToken", accessToken, {
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

export const forgotPassword = wrapAsync(async (req, res, next) => {
  const { email } = req.body;

  const user = await User.findOne({ email });

  if (!user) return next(new ApiError(false, 404, "User Not Found"));

  const token = generateRandomToken(25);

  user.resetPasswordToken = token;

  await user.save();

  sendForgotPasswordMail(token, user);

  return res
    .status(200)
    .json(
      new ApiResponse(
        true,
        "Forgot Password Link has been sent to your email please reset your password",
        { success: true }
      )
    );
});

export const resetPassword = wrapAsync(async (req, res, next) => {
  // get Old-New Password from req.body;
  const { token } = req.query;
  const { password } = req.body;

  // check is oldPassword is equal to user-password , if equal then update the newPassword;
  const user = await User.findOne({ resetPasswordToken: token });

  if (!user) return next(new ApiError(false, 401, "Invalid UID"));

  user.password = password;

  await user.save();

  return res.status(200).json(new ApiResponse(true, "Password Updated", {}));
});

export const checkAuthentication = wrapAsync(async (req, res, next) => {
  const accessToken = req.cookies?.accessToken;

  if (accessToken) {
    const user = jwt.verify(accessToken, JWT_SECRET);

    req.user = user;

    return res.status(200).json({
      id: user.id,
      role: user.role,
    });
  }

  return next(new ApiError(false, 401, "Authorized"));
});

export const logoutUser = (req, res) => {
  res
    .status(200)
    .clearCookie("accessToken", {
      httpOnly: true,
      SameSite: "none",
    })
    .json(new ApiResponse(true, "User Logout", {}));
};
