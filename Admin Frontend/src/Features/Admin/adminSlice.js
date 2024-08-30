import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { checkAuth, getAdminInfo, loginAdmin } from "./adminAuthApi";

export const loginAdminAsync = createAsyncThunk(
  "admin/loginAdmin",
  async (data) => {
    const response = await loginAdmin(data);
    return response;
  }
);

export const checkAuthAsync = createAsyncThunk("auth/checkAuth", async () => {
  const response = await checkAuth();
  return response;
});

export const getAdminInfoAsync = createAsyncThunk(
  "user/getUserInfo",
  async () => {
    const response = await getAdminInfo();
    return response;
  }
);

const initialState = {
  status: "idle",
  loggedInAdminToken: null,
  adminInfo: null,
  error: null,
  checkAuth: false,
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
        state.loggedInAdminToken = action.payload.data;
      })
      .addCase(loginAdminAsync.rejected, (state, action) => {
        state.status = "idle";
        state.error = action.error;
      })
      .addCase(getAdminInfoAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getAdminInfoAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.adminInfo = action.payload;
      })
      .addCase(getAdminInfoAsync.rejected, (state, action) => {
        state.status = "idle";
        state.error = action.error;
      })
      .addCase(checkAuthAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.loggedInAdminToken = action.payload.data;
        state.checkAuth = true;
      })
      .addCase(checkAuthAsync.rejected, (state) => {
        state.status = "idle";
        state.checkAuth = true;
      });
  },
});

export const selectIsAdmin = (state) => state.admin.isAdmin;
export const selectLoggedInAdminToken = (state) =>
  state.admin.loggedInAdminToken;
export const selectAdminInfo = (state) => state.admin.adminInfo;
export const selectCheckAuth = (state) => state.admin.checkAuth;

export default adminSlice.reducer;
