import Product from "../Models/Product.Model.js";
import wrapAsync from "../Utils/wrapAsync.js";
import ApiResponse from "../Utils/ApiResponse.js";
import ApiError from "../Utils/ApiError.js";
import User from "../Models/User.Modal.js";

// Validate Users Authentication; ( Authentication check in middleware ( Auth ) )
// Controllers for Authenticate Users Only;

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
  const user = await User.findById(req.user.id);

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
