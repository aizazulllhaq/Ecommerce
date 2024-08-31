import { Router } from "express";
import {
  getOrdersByUserId,
  newOrder,
} from "../Controllers/Order.Controller.js";

const orderRouter = Router();

orderRouter
  .get("/user", getOrdersByUserId)
  .post("/new", newOrder)

export default orderRouter;
