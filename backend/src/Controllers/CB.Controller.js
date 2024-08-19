import Brand from "../Models/Brand.Model.js";
import Category from "../Models/Category.Model.js";
import ApiError from "../Utils/ApiError.js";
import ApiResponse from "../Utils/ApiResponse.js";
import wrapAsync from "../Utils/wrapAsync.js";

export const getAllCategories = wrapAsync(async (req, res, next) => {
  const Categories = await Category.find({}).select("label value checked -_id");

  if (!Categories)
    return next(new ApiError(false, 404, "Categories Not Found"));

  return res
    .status(200)
    .json(new ApiResponse(true, "All Categories", Categories));
});

export const getAllBrands = wrapAsync(async (req, res, next) => {
  const Brands = await Brand.find({}).select("label value checked -_id");

  if (!Brands) return next(new ApiError(false, 404, "Brands Not Found"));

  return res.status(200).json(new ApiResponse(true, "All Categories", Brands));
});
