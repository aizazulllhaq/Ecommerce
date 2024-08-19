import { Router } from "express";
import {
  signInValidation,
  signUpValidation,
} from "../Utils/Validation/Auth.Validation.js";
import { signIn, signUp } from "../Controllers/Auth.Controller.js";
import upload from "../Middlewares/Multer.js";

const authRouter = Router();

authRouter
  .post("/signup", signUpValidation, upload.single("profileImg"), signUp)
  .post("/signin", signInValidation, signIn);

export default authRouter;
