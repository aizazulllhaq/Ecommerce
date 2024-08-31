import { Router } from "express";
import {
  adminInfo,
  createProduct,
  deleteProductPermanently,
  deleteProductTemporary,
  getAllProducts,
  getSingleProduct,
  logoutAdmin,
  updateProduct,
} from "../Controllers/Admin.Controller.js";


const adminRouter = Router();

// /api/v1/admin

adminRouter
  .get("/info", adminInfo)
  .post("/logout", logoutAdmin)
  .get("/products", getAllProducts)
  .post("/product/new", createProduct)
  .get("/product/:pid", getSingleProduct)
  .patch("/product/:pid", updateProduct)
  .patch("/product/temp/:pid", deleteProductTemporary)
  .delete("/product/del/:pid", deleteProductPermanently);

export default adminRouter;
