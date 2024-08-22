import axios from "axios";
import apiClient from "../Common/apiClient";

export async function signUpUser(data) {
  try {
    const response = await apiClient.post("/auth/signup", data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.log("Error Occurred : ", error);
  }
}

export async function signInUser(data) {
  try {
    const response = await apiClient.post("/auth/signin", data, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response.data.data;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function checkAuth() {
  try {
    const response = await apiClient.get("/auth/check");
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function LogoutUser() {
  try {
    const response = await apiClient.get("/auth/logout");
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function forgotPassword(email) {
  try {
    const response = await axios.post(
      "http://localhost:3000/api/v1/auth/forgot-password",
      { email }
    );
    return response.data.data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
}

export async function resetPassword(data) {
  try {
    const response = await axios.post(
      `http://localhost:3000/api/v1/auth/reset-password?token=${data.token}`,
      { password: data.password }
    );

    return response.data.msg;
  } catch (error) {
    throw new Error(error.response.data.error)
  }
}
