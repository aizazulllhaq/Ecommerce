import { uploadOnCloudinary } from "../Config/CloudinaryConfig.js";
import User from "../Models/User.Modal.js";
import ApiError from "../Utils/ApiError.js";
import ApiResponse from "../Utils/ApiResponse.js";
import wrapAsync from "../Utils/wrapAsync.js";

// api/v1/users

// /signup :
export const signUp = wrapAsync(async (req, res, next) => {
  // Validate required fields; signUpValidation.js
  // get (name,email,password,)
  const { name, email, password } = req.body;
  // const profileImg = req.file;
  console.log("body : ", req.body);

  // check if account exists with this email;
  const isUser = await User.findOne({ email });

  if (isUser) return next(new ApiError(false, 400, "User already Exists"));

  // const result = await uploadOnCloudinary(profileImg.path);

  // console.log(result);

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
      sameSite: "none",
    })
    .json(new ApiResponse(true, "User Created Successfull", accessToken));
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
    .json(new ApiResponse(true, "Login Successfull", accessToken));
});

export const forgetPassword = wrapAsync(async (req, res, next) => {
  // get userID from req.user;
  const uid = req.user.id;

  // get Old-New Password from req.body;
  const { oldPassword, newPassword } = req.body;

  // check is oldPassword is equal to user-password , if equal then update the newPassword;
  const user = await User.findById(uid).select("password -_id");

  if (!user) return next(new ApiError(false, 401, "Invalid UID"));

  const isPasswordMatch = await user.isPasswordCorrect(oldPassword);

  if (!isPasswordMatch)
    return next(new ApiError(false, 401, "Invalid Credentials"));

  user.password = newPassword;

  await user.save();

  console.log("Forget Password user : ", user);
  return res.status(200).json(new ApiResponse(true, "Password Updated", user));
});
