import { Router } from "express";
import {
  getUserOrders,
  getUserinfo,
  updateUserAddresses,
} from "../Controllers/User.Controller.js";

const userRouter = Router();

userRouter
  .get("/:uid/orders", getUserOrders)
  .get("/info", getUserinfo)
  // .patch("/update", upload.single("profileImg"), updateUser);
  .patch("/update", updateUserAddresses);

export default userRouter;
