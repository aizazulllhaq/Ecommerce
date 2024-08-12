import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../Features/Product-List/productSlice";
import authenticationReducer from "../Features/Auth/authenticationSlice";
import cartReducer from "../Features/Cart/cartSlice";
import orderReducer from "../Features/Order/orderSlice";
import userReducer from "../Features/User/userSlice";

export const store = configureStore({
  reducer: {
    auth: authenticationReducer,
    product: productReducer,
    cart: cartReducer,
    order: orderReducer,
    user: userReducer,
  },
});
