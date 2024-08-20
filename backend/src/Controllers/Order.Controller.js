import Order from "../Models/Order.Model.js";
import User from "../Models/User.Modal.js";
import ApiError from "../Utils/ApiError.js";
import ApiResponse from "../Utils/ApiResponse.js";
import wrapAsync from "../Utils/wrapAsync.js";

export const newOrder = wrapAsync(async (req, res, next) => {
  const uid = req.user.id;

  const newOrder = await Order.create({ ...req.body, uid: uid });

  console.log(newOrder);

  return res
    .status(201)
    .json(new ApiResponse(true, "New Order Created", newOrder));
});

export const getOrdersByUserId = wrapAsync(async (req, res, next) => {
  const uid = req.user.id;

  const userOrders = await Order.find({ uid });

  console.log("user orders : ", userOrders);

  return res.status(200).json(new ApiResponse(true, "User Orders", userOrders));
});

export const getAllOrders = wrapAsync(async (req, res, next) => {
  // sort = {_sort:"price",_order="desc"}
  // pagination = {_page:1,_limit=10}
  let query = Order.find({});
  let totalOrdersQuery = Order.find({});

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
