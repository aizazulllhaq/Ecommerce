import axios from "axios";

export async function getUserOrders(userID) {
  try {
    const response = await axios.get(
      "http://localhost:8000/orders?user.id=" + userID
    );
    return response.data;
  } catch (error) {
    console.log("Error Occurred : ", error.message);
  }
}

export async function getUserInfo(userID) {
  try {
    const response = await axios.get(
      "http://localhost:8000/users?id=" + userID
    );
    return response.data[0];
  } catch (error) {
    console.log("Error Occurred : ", error.message);
  }
}

export async function updateUser(data) {
  try {
    const response = await axios.patch(
      `http://localhost:8000/users/${data.id}`,
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
