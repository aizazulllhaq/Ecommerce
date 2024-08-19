import Product from "../Models/Product.Model.js";
import wrapAsync from "../Utils/wrapAsync.js";
import ApiResponse from "../Utils/ApiResponse.js";
import ApiError from "../Utils/ApiError.js";

// Validate Users Authentication; ( Authentication check in middleware ( Auth ) )
// Controllers for Authenticate Users Only;

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

// test :
export const GAP = wrapAsync(async (req, res) => {
  const products = await Product.find({});
  res.json({ products: products });
});

export const getAllProducts = wrapAsync(async (req, res, next) => {
  // Fetch all products from database applied given filters , sorting;

  // filter : {"category":["smartphone","laptops"]}
  // sort : {_sort:"price",_order:"desc"}
  // Pagination : {_page:1,_limit:10}
  let condition = {};

  if (!req.query.admin) {
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
    new ApiResponse(true, "All Filter & Sort & Paginate Product", result)
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
  const { pid } = req.params;

  // Find product in database & Delete it;
  const product = await Product.findById(pid);

  product.deleted = true;

  await product.save();

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

  await Product.findByIdAndDelete(pid);

  // return response;
  return res
    .status(200)
    .json(
      new ApiResponse(true, "Product Deleted Permanantly", { success: true })
    );
});
