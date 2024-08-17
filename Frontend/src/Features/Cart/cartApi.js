import axios from "axios";
import apiClient from "../Common/apiClient";

export async function addToCart(item) {
  try {
    const response = await apiClient.post("/cart", item, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.log("Error Occurred : ", error.message);
  }
}

export async function getCartItemByUserId(userId) {
  try {
    const response = await apiClient.get(`/cart?user=${userId}`);
    return response.data;
  } catch (error) {
    console.log("Error Occurred : ", error.message);
  }
}

export async function updateCart(product) {
  try {
    const response = await apiClient.patch(`cart/${product.id}`, product, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.log("Error Occurred : ", error.message);
  }
}

export async function deleteCartItem(id) {
  try {
    const response = await apiClient.delete(`/cart?id=${id}`);
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
