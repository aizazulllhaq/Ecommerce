import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../Features/Product-List/productSlice";
import authenticationReducer from "../Features/Auth/authenticationSlice";
import orderReducer from "../Features/Order/orderSlice";
import userReducer from "../Features/User/userSlice";
import adminReducer from "../Features/Admin/adminSlice";

export const store = configureStore({
  reducer: {
    auth: authenticationReducer,
    product: productReducer,
    order: orderReducer,
    user: userReducer,
    admin: adminReducer,
  },
});
