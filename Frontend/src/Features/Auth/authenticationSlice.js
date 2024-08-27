import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  checkAuth,
  forgotPassword,
  LogoutUser,
  resetPassword,
  signInUser,
  signUpUser,
} from "./authApi";

export const signUpUserAsync = createAsyncThunk(
  "auth/signUpUser",
  async (data) => {
    const response = await signUpUser(data);
    return response;
  }
);

export const signInUserAsync = createAsyncThunk(
  "auth/signInUser",
  async (data) => {
    const response = await signInUser(data);
    return response;
  }
);

export const checkAuthAsync = createAsyncThunk("auth/checkAuth", async () => {
  const response = await checkAuth();
  return response;
});

export const LogoutUserAsync = createAsyncThunk("auth/LogoutUser", async () => {
  const response = await LogoutUser();
  return response;
});

export const forgotPasswordAsync = createAsyncThunk(
  "auth/forgotPassword",
  async (email) => {
    const response = await forgotPassword(email);
    return response;
  }
);

export const resetPasswordAsync = createAsyncThunk(
  "auth/resetPassword",
  async (data) => {
    const response = await resetPassword(data);
    return response;
  }
);

const initialState = {
  status: "idle",
  loggedInUserToken: null,
  checkAuth: false,
  error: null,
  resetPassword: false,
  message: null,
  signupError:null,
};

export const authenticationSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signUpUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(signUpUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.message = action.payload.msg;
        state.loggedInUserToken = action.payload;
      })
      .addCase(signUpUserAsync.rejected, (state, action) => {
        state.status = "idle";
        state.signupError = action.error;
      })
      .addCase(signInUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(signInUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.loggedInUserToken = action.payload;
      })
      .addCase(signInUserAsync.rejected, (state, action) => {
        state.status = "idle";
        state.error = action.error;
      })
      .addCase(LogoutUserAsync.pending, (state) => {
        state.status = "idle";
      })
      .addCase(LogoutUserAsync.fulfilled, (state) => {
        state.status = "idle";
        state.loggedInUserToken = null;
      })
      .addCase(checkAuthAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.loggedInUserToken = action.payload;
        state.checkAuth = true;
      })
      .addCase(checkAuthAsync.rejected, (state) => {
        state.status = "idle";
        state.checkAuth = true;
      })
      .addCase(forgotPasswordAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(forgotPasswordAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.resetPassword = true;
      })
      .addCase(forgotPasswordAsync.rejected, (state, action) => {
        state.status = "idle";
        state.error = action.error;
      })
      .addCase(resetPasswordAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.message = action.payload;
      })
      .addCase(resetPasswordAsync.rejected, (state) => {
        state.status = "idle";
      });
  },
});

export const selectLoggedInUser = (state) => state.auth.loggedInUserToken;
export const selectCheckAuth = (state) => state.auth.checkAuth;

export default authenticationSlice.reducer;
