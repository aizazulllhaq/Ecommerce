import { Router } from "express";
import { getAllBrands, getAllCategories } from "../Controllers/CB.Controller.js";

const cbRouter = Router();

cbRouter.get("/categories", getAllCategories).get("/brands", getAllBrands);

export default cbRouter;
