import { Router } from "express";
import {
  addToCart,
  deleteCartItemById,
  getCartItemsByUserId,
  updateCart,
} from "../Controllers/Cart.Controller.js";

const cartRouter = Router();

cartRouter
  .post("/new", addToCart)
  .get("/my/items", getCartItemsByUserId)
  .patch("/edit/:pid", updateCart)
  .delete("/del/:cid", deleteCartItemById);

export default cartRouter;
