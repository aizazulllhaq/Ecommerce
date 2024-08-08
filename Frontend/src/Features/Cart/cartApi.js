import axios from "axios";

export async function addToCart(item) {
  try {
    const response = await axios.post("http://localhost:8000/cart", item, {
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
    const response = await axios.get(
      `http://localhost:8000/cart?user=${userId}`
    );
    return response.data;
  } catch (error) {
    console.log("Error Occurred : ", error.message);
  }
}

export async function updateCart(product) {
  try {
    const response = await axios.patch(
      `http://localhost:8000/cart/${product.id}`,
      product,
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

export async function deleteCartItem(id) {
  try {
    const response = await axios.delete(`http://localhost:8000/cart?id=${id}`);
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
