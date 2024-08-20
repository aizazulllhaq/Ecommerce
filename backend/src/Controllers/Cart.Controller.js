import Cart from "../Models/Cart.Model.js";
import ApiResponse from "../Utils/ApiResponse.js";
import wrapAsync from "../Utils/wrapAsync.js";

export const addToCart = wrapAsync(async (req, res, next) => {
  // TODO : user.id needed to here bcoz we don't put in frontend
  const { product, quantity } = req.body;
  const uid = req.user.id;

  const newItem = await Cart.create({ product, quantity, uid });

  const result = await newItem.populate("product");

  return res
    .status(201)
    .json(new ApiResponse(true, "New Item Add to Cart", result));
});

export const getCartItemsByUserId = wrapAsync(async (req, res, next) => {
  const uid = req.user.id;

  const Items = await Cart.find({ uid }).populate("product");

  return res.status(200).json(new ApiResponse(true, "User Cart Items", Items));
});

export const updateCart = wrapAsync(async (req, res, next) => {
  const { pid } = req.params;
  const { quantity } = req.body;

  const updatedCart = await Cart.findOne({ product: pid });

  updatedCart.quantity = quantity;

  await updatedCart.save();

  return res
    .status(200)
    .json(new ApiResponse(true, "Cart Quantity Updated", updatedCart));
});

export const deleteCartItemById = wrapAsync(async (req, res, next) => {
  const { itemID } = req.params;

  const deletedItem = await Cart.findByIdAndDelete(itemID);

  console.log("deleted item : ", deletedItem);

  return res
    .status(200)
    .json(new ApiResponse(true, "Cart Item Deleted", deletedItem));
});
