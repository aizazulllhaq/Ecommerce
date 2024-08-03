import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getUsers } from "./authApi";

export const getUsersAsync = createAsyncThunk("auth/getUsers", async () => {
  const response = await getUsers();
  return response;
});

const initialState = {
  status: "idle",
  users: null,
  user: null,
  isLoggedIn: false,
  error: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUsersAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getUsersAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.users = action.payload;
      })
      .addCase(getUsersAsync.rejected, (state, action) => {
        state.status = "idle";
        state.error = action.error;
      });
  },
});

export default authSlice.reducer;
