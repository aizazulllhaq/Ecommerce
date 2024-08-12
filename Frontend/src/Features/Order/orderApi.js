import axios from "axios";

export async function newOrder(orderData) {
  try {
    const response = await axios.post(
      "http://localhost:8000/orders",
      orderData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log("Error Occurred : ", error.message);
  }
}
