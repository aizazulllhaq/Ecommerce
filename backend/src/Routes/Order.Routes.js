import { Router } from "express";
import {
  getAllOrders,
  getOrdersByUserId,
  newOrder,
  updateOrder,
} from "../Controllers/Order.Controller.js";

const orderRouter = Router();

orderRouter
  .get("/", getAllOrders)
  .get("/user", getOrdersByUserId)
  .post("/new", newOrder)
  .patch("/edit/:orderID", updateOrder);

export default orderRouter;
