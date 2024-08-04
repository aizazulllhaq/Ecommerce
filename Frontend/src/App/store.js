import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../Features/template/componentSlice";
import productReducer from "../Features/Product-List/productSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    product: productReducer,
  },
});
