import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { newOrder } from "./orderApi";

export const newOrderAsync = createAsyncThunk(
  "order/newOrder",
  async (orderData) => {
    const response = await newOrder(orderData);
    return response;
  }
);

const initialState = {
  status: "idle",
  error: null,
  orders: [],
  currentOrder: null,
};

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    resetOrder: (state) => {
      state.currentOrder = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(newOrderAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(newOrderAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.orders.push(action.payload);
        state.currentOrder = action.payload;
      })
      .addCase(newOrderAsync.rejected, (state, action) => {
        state.status = "idle";
        state.error = action.error;
      });
  },
});

export const { resetOrder } = orderSlice.actions;
export const currentOrder = (state) => state.order.currentOrder;

export default orderSlice.reducer;
