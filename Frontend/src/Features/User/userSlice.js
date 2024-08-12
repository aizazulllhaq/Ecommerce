import {
  buildCreateSlice,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";
import { getUserOrders } from "./userApi";

export const getUserOrdersAsync = createAsyncThunk(
  "user/getUserOrders",
  async (userID) => {
    const response = await getUserOrders(userID);
    return response;
  }
);

const initialState = {
  userOrders: [],
  status: "idle",
  error: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUserOrdersAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getUserOrdersAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.userOrders = action.payload;
      })
      .addCase(getUserOrdersAsync.rejected, (state, action) => {
        state.status = "idle";
        state.error = action.error;
      });
  },
});

export const selectUserOrders = (state) => state.user.userOrders;

export default userSlice.reducer;
