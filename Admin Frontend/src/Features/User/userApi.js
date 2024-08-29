import apiClient from "../Common/apiClient";

export async function getUserOrders() {
  try {
    const response = await apiClient.get("/orders/user");
    return response.data.data;
  } catch (error) {
    console.log("Error Occurred : ", error.message);
  }
}

export async function getUserInfo() {
  try {
    const response = await apiClient.get(`/users/info`);
    return response.data.data;
  } catch (error) {
    console.log("Error Occurred : ", error.message);
  }
}

export async function updateUser(data) {
  try {
    const response = await apiClient.patch(`/users/update`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data.data;
  } catch (error) {
    console.log("Error Occurred :", error.message);
  }
}
