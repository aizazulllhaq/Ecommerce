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

export async function getAllOrders(sort, pagination) {
  let queryString = "";

  for (let key in pagination) {
    queryString += `${key}=${pagination[key]}&`;
  }

  for (let key in sort) {
    queryString += `${key}=${sort[key]}&`;
  }

  try {
    const response = await axios.get(
      `http://localhost:8000/orders?${queryString}`
    );
    const totalItems = response.headers["x-total-count"];
    return {
      data: response.data,
      totalOrders: totalItems,
    };
  } catch (error) {
    console.log("Error Occurred : ", error.message);
  }
}

export async function updateOrder(updatedOrder) {
  try {
    const response = await axios.patch(
      `http://localhost:8000/orders/${updatedOrder.id}`,
      updatedOrder,
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
