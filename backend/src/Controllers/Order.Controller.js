import wrapAsync from "../Utils/wrapAsync.js";

export const newOrder = wrapAsync(async (req, res, next) => {
  console.log("newOrder : ", req.user.id, req.body);
});

export const getOrdersByUserId = wrapAsync(async (req, res, next) => {
  console.log("getOrdersByUserId : ", req.user.id);
});

export const getAllOrders = wrapAsync(async (req, res, next) => {
  console.log("all orders : ", req.body);
});

export const updateOrder = wrapAsync(async (req, res, next) => {
  console.log("update orders : ", req.user.id, req.body);
});
