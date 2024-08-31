import Order from "../Models/Order.Model.js";
import ApiResponse from "../Utils/ApiResponse.js";
import { sendOrderMail } from "../Utils/sendMail.js";
import wrapAsync from "../Utils/wrapAsync.js";

export const newOrder = wrapAsync(async (req, res, next) => {
  const uid = req.user.id;
  const {
    items,
    itemsTotalAmount,
    totalItems,
    status,
    selectAddress,
    paymentMethod,
  } = req.body;

  const newOrder = await (
    await Order.create({ ...req.body, items: req.body.items, uid: uid })
  ).populate("items");

  sendOrderMail(newOrder);

  return res
    .status(201)
    .json(new ApiResponse(true, "New Order Created", newOrder));
});

export const getOrdersByUserId = wrapAsync(async (req, res, next) => {
  const uid = req.user.id;

  const userOrders = await Order.find({ uid }).populate("items");
  return res.status(200).json(new ApiResponse(true, "User Orders", userOrders));
});


