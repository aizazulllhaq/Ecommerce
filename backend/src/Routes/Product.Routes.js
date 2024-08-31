import { Router } from "express";
import {
  getAllProducts,
  getSingleProduct,
} from "../Controllers/Product.Controller.js";

const productRoutes = Router();

productRoutes.get("/", getAllProducts).get("/:pid", getSingleProduct);

export default productRoutes;
