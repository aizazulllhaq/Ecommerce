import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getUserInfo, getUserOrders, updateUser } from "./userApi";

export const getUserOrdersAsync = createAsyncThunk(
  "user/getUserOrders",
  async () => {
    const response = await getUserOrders();
    return response;
  }
);

export const updateUserAsync = createAsyncThunk(
  "auth/updateUser",
  async (data) => {
    const response = await updateUser(data);
    return response;
  }
);

export const getUserInfoAsync = createAsyncThunk(
  "user/getUserInfo",
  async () => {
    const response = await getUserInfo();
    return response;
  }
);

const initialState = {
  userOrders: [],
  status: "idle",
  error: null,
  userInfo: null,
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
      })
      .addCase(updateUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.userInfo = action.payload;
      })
      .addCase(updateUserAsync.rejected, (state, action) => {
        state.status = "idle";
        state.error = action.error;
      })
      .addCase(getUserInfoAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getUserInfoAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.userInfo = action.payload;
      })
      .addCase(getUserInfoAsync.rejected, (state, action) => {
        state.status = "idle";
      });
  },
});

export const selectUserOrders = (state) => state.user.userOrders;
export const selectUserInfo = (state) => state.user.userInfo;

export default userSlice.reducer;
