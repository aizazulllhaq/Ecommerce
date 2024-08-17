import apiClient from "../Common/apiClient";

export async function signUpUser(data) {
  try {
    const response = await apiClient.post("/users/signup", data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.log("Error Occurred : ", error.message);
  }
}

export async function signInUser(data) {
  try {
    const response = await apiClient.post("/users/signin", data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
}

export function LogoutUser() {
  const response = { success: true };
  return response;
}
