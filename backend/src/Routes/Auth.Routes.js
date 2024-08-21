import { Router } from "express";
import {
  signInValidation,
  signUpValidation,
} from "../Utils/Validation/Auth.Validation.js";
import {
  checkAuthentication,
  signIn,
  signUp,
  logoutUser
} from "../Controllers/Auth.Controller.js";
import upload from "../Middlewares/Multer.js";

const authRouter = Router();

authRouter
  .post("/signup", signUpValidation, upload.single("profileImg"), signUp)
  .post("/signin", signInValidation, signIn)
  .get("/check", checkAuthentication)
  .get("/logout", logoutUser);

export default authRouter;
