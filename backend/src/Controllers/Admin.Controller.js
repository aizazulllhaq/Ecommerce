import Product from "../Models/Product.Model.js";
import wrapAsync from "../Utils/wrapAsync.js";
import ApiResponse from "../Utils/ApiResponse.js";
import ApiError from "../Utils/ApiError.js";
import User from "../Models/User.Modal.js";
import Brand from "../Models/Brand.Model.js";
import Category from "../Models/Category.Model.js";
import Order from "../Models/Order.Model.js";

// Products

export const createProduct = wrapAsync(async (req, res, next) => {
  // we already know that we can get a valid data from frontend , which we set in reactjs
  // Create a new product in database and save newProduct;

  const newProduct = new Product(req.body);

  newProduct.discountPrice = Math.round(
    newProduct.price * (1 - newProduct.discountPercentage / 100)
  );

  await newProduct.save();
  // return response;
  return res
    .status(201)
    .json(new ApiResponse(true, "Product Created", newProduct));
});

export const getSingleProduct = wrapAsync(async (req, res, next) => {
  // Get product id from url parameter;
  const { pid } = req.params;

  // Find product in database;
  const product = await Product.findById(pid);

  if (!product) return next(new ApiError(false, 400, "Invalid Product ID"));

  // return response with product;
  return res.status(200).json(new ApiResponse(true, "Single Product", product));
});

export const getAllProducts = wrapAsync(async (req, res, next) => {
  // Fetch all products from database applied given filters , sorting;

  // filter : {"category":["smartphone","laptops"]}
  // sort : {_sort:"price",_order:"desc"}
  // Pagination : {_page:1,_limit:10}
  let condition = {};
  const user = await User.findById(req.admin.id);

  if (user.role !== "ADMIN") {
    condition.deleted = { $ne: true };
  }

  let query = Product.find(condition);
  let totalProductQuery = Product.find(condition);

  if (req.query.category) {
    query = query.find({ category: { $in: req.query.category.split(",") } });
    totalProductQuery = totalProductQuery.find({
      category: { $in: req.query.category.split(",") },
    });
  }

  if (req.query.brand) {
    query = query.find({ brand: { $in: req.query.brand.split(",") } });
    totalProductQuery = totalProductQuery.find({
      brand: { $in: req.query.brand.split(",") },
    });
  }

  const totalDocs = await totalProductQuery.countDocuments().exec();

  if (req.query._sort && req.query._order) {
    query = query.sort({ [req.query._sort]: req.query._order });
  }

  if (req.query._page && req.query._limit) {
    const pageSize = req.query._limit;
    const page = req.query._page;

    query = query.skip(pageSize * (page - 1)).limit(pageSize);
  }
  const result = await query.exec();
  res.set("X-Total-Count", totalDocs);
  res.json(
    new ApiResponse(
      true,
      `All Filter & Sort & Paginate Products for ${
        user.role === "ADMIN" ? "Admin" : "Users"
      }`,
      { result, totalDocs }
    )
  );
});

export const updateProduct = wrapAsync(async (req, res, next) => {
  // Get product id from url parameter;
  const { pid } = req.params;

  // Find product in database;
  const product = await Product.findById(pid);

  // Get given fields from request body;
  const {
    title,
    description,
    price,
    thumbnail,
    images,
    stock,
    category,
    brand,
    discountPercentage,
  } = req.body;

  // Update given fields in db & otherwise leave old values as it is;
  if (product.title !== title) {
    product.title = title;
  }

  if (product.description !== description) {
    product.description = description;
  }

  if (product.price !== price) {
    product.price = price;
  }

  if (product.stock !== stock) {
    product.stock = stock;
  }

  if (product.price !== price) {
    product.price = price;
  }

  if (product.discountPercentage !== discountPercentage) {
    product.discountPercentage = discountPercentage;
    product.price = Math.round(price * (1 - discountPercentage / 100));
  }

  if (product.thumbnail !== thumbnail) {
    product.thumbnail = thumbnail;
  }

  if (product.images !== images) {
    product.images = images;
  }

  await product.save();

  return res
    .status(200)
    .json(new ApiResponse(true, "Product Updated", product));

  // return response;
});

export const deleteProductTemporary = wrapAsync(async (req, res, next) => {
  // Get product id from url parameter;
  const deletedProduct = req.body;

  // Find product in database & Delete it;
  const product = await Product.findByIdAndUpdate(
    deletedProduct.id,
    deletedProduct,
    {
      new: true,
    }
  );

  // return response;
  return res
    .status(200)
    .json(new ApiResponse(true, "Product Deleted Temporary", product));
});

export const deleteProductPermanently = wrapAsync(async (req, res, next) => {
  // Get product id from url parameter;
  const { pid } = req.params;

  // Check is this product already deleted-temporary ; if ? deleted-it-permanantly : deleted-it-temporary
  const product = await Product.findById(pid);

  if (!product.deleted) {
    product.deleted = true;
    await product.save();
    return res
      .status(200)
      .json(
        new ApiResponse(true, "Product Deleted Temporary", { success: true })
      );
  }

  const deletedProduct = await Product.findByIdAndDelete(pid);

  // return response;
  return res
    .status(200)
    .json(new ApiResponse(true, "Product Deleted Permanantly", deletedProduct));
});

// Admin Info

export const logoutAdmin = (req, res) => {
  res
    .status(200)
    .clearCookie("ADMaccessToken", {
      httpOnly: true,
      SameSite: "none",
    })
    .json(new ApiResponse(true, "User Logout", {}));
};

export const adminInfo = wrapAsync(async (req, res, next) => {
  const uid = req.admin.id;

  const user = await User.findById(uid);

  return res.status(200).json(new ApiResponse(true, "Admin Info", user));
});

// Admin Orders 

export const getAllOrders = wrapAsync(async (req, res, next) => {
  // sort = {_sort:"price",_order="desc"}
  // pagination = {_page:1,_limit=10}
  let query = Order.find({}).populate("items");
  let totalOrdersQuery = Order.find({}).populate("items");

  if (req.query._sort && req.query._order) {
    query = query.sort({ [req.query._sort]: req.query._order });
  }

  const totalDocs = await totalOrdersQuery.countDocuments().exec();

  if (req.query._page && req.query._limit) {
    const pageSize = req.query._limit;
    const page = req.query._page;
    query = query.skip(pageSize * (page - 1)).limit(pageSize);
  }

  const Orders = await query.exec();

  return res
    .status(200)
    .json(new ApiResponse(true, "Total Orders", { Orders, totalDocs }));
});

export const updateOrder = wrapAsync(async (req, res, next) => {
  const { orderID } = req.params;

  const updatedOrder = await Order.findByIdAndUpdate(orderID, req.body, {
    new: true,
  });

  return res
    .status(200)
    .json(new ApiResponse(true, "Order Status Updated", updatedOrder));
});

// Categories & Brands 

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
