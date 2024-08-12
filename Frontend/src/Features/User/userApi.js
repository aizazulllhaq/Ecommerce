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
