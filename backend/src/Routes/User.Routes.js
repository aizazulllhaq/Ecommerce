import { Router } from "express";
import {
  getUserOrders,
  getUserinfo,
  updateUser,
} from "../Controllers/User.Controller.js";
import upload from "../Middlewares/Multer.js";

const userRouter = Router();

userRouter
  .get("/:uid/orders", getUserOrders)
  .get("/info", getUserinfo)
  .patch("/update/:uid", upload.single("profileImg"), updateUser);

export default userRouter;
