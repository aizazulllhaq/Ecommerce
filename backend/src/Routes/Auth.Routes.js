import { Router } from "express";
import {
  signInValidation,
  signUpValidation,
} from "../Utils/Validation/Auth.Validation.js";
import {
  checkAuthentication,
  signIn,
  signUp,
  logoutUser,
  forgotPassword,
  resetPassword,
  adminSignin,
  logoutAdmin,
  adminCheckAuthentication,
} from "../Controllers/Auth.Controller.js";
import upload from "../Middlewares/Multer.js";

const authRouter = Router();

authRouter
  .post("/signup", signUpValidation, upload.single("profileImg"), signUp)
  .post("/signin", signInValidation, signIn)
  .post("/forgot-password", forgotPassword)
  .post("/reset-password", resetPassword)
  .get("/check", checkAuthentication)
  .get("/logout", logoutUser)
  .post("/admin/signin", adminSignin)
  .post("/admin/logout", logoutAdmin)
  .get("/admin/check", adminCheckAuthentication);

export default authRouter;
