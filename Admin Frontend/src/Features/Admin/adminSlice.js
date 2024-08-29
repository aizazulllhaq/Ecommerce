import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { loginAdmin } from "./adminAuthApi";

export const loginAdminAsync = createAsyncThunk(
  "admin/loginAdmin",
  async (data) => {
    const response = await loginAdmin(data);
    return response;
  }
);

const initialState = {
  status: "idle",
  loggedInAdminToken: null,
  error: null,
  message: null,
};

export const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginAdminAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loginAdminAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.loggedInAdminToken = action.payload;
      })
      .addCase(loginAdminAsync.rejected, (state, action) => {
        state.status = "idle";
        state.error = action.error;
      });
  },
});

export const selectIsAdmin = (state) => state.admin.isAdmin;
export const selectLoggedInAdminToken = (state) =>
  state.admin.loggedInAdminToken;

export default adminSlice.reducer;
