import axios from "axios";

export async function getAllProducts() {
  try {
    const response = await axios.get("http://localhost:8000/products");
    return response.data;
  } catch (error) {
    console.log("Error Occurred : ", error);
  }
}

export async function getProductsByFilter(filter, sort) {
  // filter => {"category":"smartphone"} , {"brand":"al halal"}
  let queryString = "";
  for (let key in filter) {
    queryString += `${key}=${filter[key]}&`;
  }

  for (let key in sort) {
    queryString += `${key}=${sort[key]}&`;
  }

  try {
    const response = await axios.get(
      `http://localhost:8000/products?${queryString}`
    );
    console.log(response);
  } catch (error) {
    console.log(error);
    console.log("Error Occurred : ", error.message);
  }
}
