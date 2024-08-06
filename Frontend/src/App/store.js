import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../Features/Product-List/productSlice";
import authenticationReducer from "../Features/Auth/authenticationSlice";

export const store = configureStore({
  reducer: {
    auth: authenticationReducer,
    product: productReducer,
  },
});
