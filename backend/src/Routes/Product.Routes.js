import { Router } from "express";
import {
  createProduct,
  deleteProductPermanently,
  deleteProductTemporary,
  GAP,
  getAllProducts,
  getSingleProduct,
  updateProduct,
} from "../Controllers/Product.Controller.js";

const productRoutes = Router();

productRoutes
  .get("/", getAllProducts)
  .get("/GAP", GAP)
  .post("/new", createProduct)
  .get("/:pid", getSingleProduct)
  .patch("/:pid", updateProduct)
  .put("/temp/:pid", deleteProductTemporary)
  .delete("/del/:pid", deleteProductPermanently);

export default productRoutes;
