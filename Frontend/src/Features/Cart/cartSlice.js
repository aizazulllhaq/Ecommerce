import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addToCart,
  deleteCartItem,
  getCartItemByUserId,
  resetCart,
  updateCart,
} from "./cartApi";

export const addToCartAsync = createAsyncThunk(
  "cart/addToCart",
  async (item) => {
    const response = await addToCart(item);
    return response;
  }
);

export const updateCartAsync = createAsyncThunk(
  "cart/updateCart",
  async (product) => {
    const response = await updateCart(product);
    return response;
  }
);

export const deleteCartItemAsync = createAsyncThunk(
  "cart/deleteCartItem",
  async (id) => {
    const response = await deleteCartItem(id);
    return response;
  }
);

export const getCartItemByUserIdAsync = createAsyncThunk(
  "cart/getCartItemByUserId",
  async (userId) => {
    const response = await getCartItemByUserId(userId);
    return response;
  }
);

export const resetCartAsync = createAsyncThunk(
  "cart/resetCart",
  async (userID) => {
    const response = await resetCart(userID);
    return response;
  }
);

const initialState = {
  status: "idle",
  error: null,
  items: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addToCartAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addToCartAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.items.push(action.payload);
      })
      .addCase(addToCartAsync.rejected, (state, action) => {
        state.status = "idle";
        state.error = action.error;
      })
      .addCase(updateCartAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateCartAsync.fulfilled, (state, action) => {
        state.status = "idle";
        const index = state.items.findIndex(
          (el) => el.id === action.payload.id
        );
        state.items[index] = action.payload;
      })
      .addCase(updateCartAsync.rejected, (state, action) => {
        state.status = "idle";
        state.error = action.error;
      })
      .addCase(deleteCartItemAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteCartItemAsync.fulfilled, (state, action) => {
        state.status = "idle";
        const index = state.items.findIndex((el) => el.id === action.payload);
        state.items.splice(index, 1);
      })
      .addCase(deleteCartItemAsync.rejected, (state, action) => {
        state.status = "idle";
        state.error = action.error;
      })
      .addCase(getCartItemByUserIdAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getCartItemByUserIdAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.items = action.payload;
      })
      .addCase(getCartItemByUserIdAsync.rejected, (state, action) => {
        state.status = "idle";
        state.error = action.error;
      })
      .addCase(resetCartAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(resetCartAsync.fulfilled, (state) => {
        state.status = "idle";
        state.items = [];
      })
      .addCase(resetCartAsync.rejected, (state, action) => {
        state.status = "idle";
        state.error = action.error;
      });
  },
});

export const selectItems = (state) => state.cart.items;

export default cartSlice.reducer;
