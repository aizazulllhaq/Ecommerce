import { Router } from "express";
import {
  adminCheckAuthentication,
  adminSignin,
} from "../Controllers/Auth.Admin.Controller.js";

const authAdminRouter = Router();

authAdminRouter
  .post("/signin", adminSignin)
  .get("/check", adminCheckAuthentication);

export default authAdminRouter;
