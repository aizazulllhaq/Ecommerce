import apiClient from "../Common/apiClient";

export async function signUpUser(data) {
  try {
    const response = await apiClient.post("/auth/signup", data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data.data;
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

export function LogoutUser() {
  const response = { success: true };
  return response;
}
