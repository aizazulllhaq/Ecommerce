import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { signInUser, signUpUser } from "./authApi";

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



const initialState = {
  status: "idle",
  loggedInUser: null,
  error: null,
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
        state.loggedInUser = action.payload;
      })
      .addCase(signUpUserAsync.rejected, (state, action) => {
        state.status = "idle";
        state.error = action.error;
      })
      .addCase(signInUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(signInUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.loggedInUser = action.payload;
      })
      .addCase(signInUserAsync.rejected, (state, action) => {
        state.status = "idle";
        state.error = action.error;
      });
  },
});

export const selectLoggedInUser = (state) => state.auth.loggedInUser;

export default authenticationSlice.reducer;
