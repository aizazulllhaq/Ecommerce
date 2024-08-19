import apiClient from "../Common/apiClient";

export async function addToCart(item) {
  try {
    const response = await apiClient.post("/cart/new", item, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data.data;
  } catch (error) {
    console.log("Error Occurred : ", error.message);
  }
}

export async function getCartItemByUserId() {
  try {
    const response = await apiClient.get(`/cart/my/items`);
    return response.data.data;
  } catch (error) {
    console.log("Error Occurred : ", error.message);
  }
}

export async function updateCart(data) {
  console.log(data);
  try {
    const response = await apiClient.patch(
      `/cart/edit/${data.pid}`,
      {
        quantity: data.quantity,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log("updateCart : ", response);
    return response.data.data;
  } catch (error) {
    console.log(error);
    console.log("Error Occurred : ", error.message);
  }
}

export async function deleteCartItem(id) {
  try {
    const response = await apiClient.delete(`/cart/del/${id}`);
    console.log("deleteCartItem : ", response);
    return response.data;
  } catch (error) {
    console.log("Error Occurred : ", error.message);
  }
}

export async function resetCart(userID) {
  try {
    const response = await getCartItemByUserId(userID);
    const items = response.data;
    for (let item of items) {
      await deleteCartItem(item.id);
    }
  } catch (error) {
    console.log("Error Occurred : ", error.message);
  }
}
