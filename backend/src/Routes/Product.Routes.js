import { Router } from "express";
import {
  createProduct,
  deleteProductPermanently,
  deleteProductTemporary,
  getAllProducts,
  getSingleProduct,
  updateProduct,
} from "../Controllers/Product.Controller.js";

const productRoutes = Router();

productRoutes
  .get("/", getAllProducts)
  .post("/new", createProduct)
  .get("/:pid", getSingleProduct)
  .patch("/:pid", updateProduct)
  .patch("/temp/:pid", deleteProductTemporary)
  .delete("/del/:pid", deleteProductPermanently);

export default productRoutes;
