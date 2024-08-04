import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllProducts, getProductsByFilter } from "./productApi";

export const getAllProductsAsync = createAsyncThunk(
  "product/getAllProducts",
  async () => {
    const response = await getAllProducts();
    return response;
  }
);

export const getProductsByFilterAsync = createAsyncThunk(
  "product/getProductsByFilter",
  async ({ filter, sort }) => {
    const response = await getProductsByFilter(filter,sort);
    return response;
  }
);

const initialState = {
  status: "idle",
  products: [],
  product: null,
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllProductsAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getAllProductsAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.products = action.payload;
      })
      .addCase(getProductsByFilterAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getProductsByFilterAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.products = action.payload;
      });
  },
});

export default productSlice.reducer;
