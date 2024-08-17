import apiClient from "../Common/apiClient";

export async function getUserOrders(userID) {
  try {
    const response = await apiClient.get(
      "/orders?user.id=" + userID
    );
    return response.data;
  } catch (error) {
    console.log("Error Occurred : ", error.message);
  }
}

export async function getUserInfo(userID) {
  try {
    const response = await apiClient.get(
      "/users?id=" + userID
    );
    return response.data[0];
  } catch (error) {
    console.log("Error Occurred : ", error.message);
  }
}

export async function updateUser(data) {
  try {
    const response = await apiClient.patch(
      `/users/${data.id}`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log("Error Occurred :", error.message);
  }
}
