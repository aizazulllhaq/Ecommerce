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
  .patch("/edit/:cid", updateCart)
  .delete("/del/:itemID", deleteCartItemById);

export default cartRouter;
