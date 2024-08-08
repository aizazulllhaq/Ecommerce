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
    console.log("order response : ", response);
    return response.data;
  } catch (error) {
    console.log(error);
    console.log("Error Occurred : ", error.message);
  }
}
