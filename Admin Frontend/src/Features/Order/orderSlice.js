import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllOrders, newOrder, updateOrder } from "./orderApi";

export const newOrderAsync = createAsyncThunk(
  "order/newOrder",
  async (orderData) => {
    const response = await newOrder(orderData);
    return response;
  }
);

export const getAllOrdersAsync = createAsyncThunk(
  "order/getAllOrders",
  async ({ sort, pagination }) => {
    const response = await getAllOrders(sort, pagination);
    return response;
  }
);

export const updateOrderAsync = createAsyncThunk(
  "order/updateOrder",
  async (updatedOrder) => {
    const response = await updateOrder(updatedOrder);
    return response;
  }
);

const initialState = {
  status: "idle",
  error: null,
  orders: [],
  currentOrder: null,
  totalOrders: null,
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
      })
      .addCase(getAllOrdersAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getAllOrdersAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.orders = action.payload.data;
        state.totalOrders = action.payload.totalOrders;
      })
      .addCase(updateOrderAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateOrderAsync.fulfilled, (state, action) => {
        state.status = "idle";
        const index = state.orders.findIndex(
          (order) => order._id === action.payload._id
        );
        state.orders[index] = action.payload;
      });
  },
});

export const { resetOrder } = orderSlice.actions;

export const currentOrder = (state) => state.order.currentOrder;
export const selectOrders = (state) => state.order.orders;
export const selectTotalOrders = (state) => state.order.totalOrders;

export default orderSlice.reducer;
