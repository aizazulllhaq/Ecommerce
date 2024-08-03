import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../Features/template/componentSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});
