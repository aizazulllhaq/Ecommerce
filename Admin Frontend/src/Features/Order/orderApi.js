import apiClient from "../Common/apiClient";

export async function newOrder(orderData) {
  try {
    const response = await apiClient.post("/orders/new", orderData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data.data;
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
    const response = await apiClient.get(`admin/orders?${queryString}`);
    return {
      data: response.data.data.Orders,
      totalOrders: response.data.data.totalDocs,
    };
  } catch (error) {
    console.log("Error Occurred : ", error.message);
  }
}

export async function updateOrder(updatedOrder) {
  try {
    const response = await apiClient.patch(
      `/admin/orders/edit/${updatedOrder._id}`,
      updatedOrder,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data.data;
  } catch (error) {
    console.log("Error Occurred : ", error.message);
  }
}
