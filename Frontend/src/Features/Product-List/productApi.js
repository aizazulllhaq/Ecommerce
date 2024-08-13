import axios from "axios";

export async function addProduct(newProduct) {
  try {
    const response = await axios.post(
      "http://localhost:8000/products",
      newProduct,
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

export async function updateProduct(updatedProduct) {
  try {
    const response = await axios.patch(
      `http://localhost:8000/products/${updatedProduct.id}`,
      updatedProduct,
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

export async function getAllProducts() {
  try {
    const response = await axios.get("http://localhost:8000/products");
    return response.data;
  } catch (error) {
    console.log("Error Occurred : ", error);
  }
}

export async function getProductsByFilter(filter, sort, pagination) {
  // NOTE : ["a","b","c"] => length = 3 & indexes = 2
  // filter object : {"category":["laptops","smartphones"]}
  // sort = { _sort : "price" , _order : "desc" }
  // pagination = { _page : page , limit = 10 }

  let queryString = "";
  for (let key in filter) {
    queryString += `${key}=${filter[key]}&`;
  }

  for (let key in sort) {
    queryString += `${key}=${sort[key]}&`;
  }

  for (let key in pagination) {
    queryString += `${key}=${pagination[key]}&`;
  }

  try {
    const response = await axios.get(
      `http://localhost:8000/products?${queryString}`
    );
    const totalItems = response.headers["x-total-count"];
    return { data: response.data, totalItems: totalItems };
  } catch (error) {
    console.log("Error Occurred : ", error.message);
  }
}

export async function getAllCategries() {
  try {
    const response = await axios.get("http://localhost:8000/categories");
    return {
      data: response.data,
    };
  } catch (error) {
    console.log("Error Occurred : ", error.message);
  }
}

export async function getAllBrands() {
  try {
    const response = await axios.get("http://localhost:8000/brands");
    return {
      data: response.data,
    };
  } catch (error) {
    console.log("Error Occurred : ", error.message);
  }
}

export async function getProductById(id) {
  try {
    const response = await axios.get(`http://localhost:8000/products/${id}`);
    return response.data;
  } catch (error) {
    console.log("Error Occurred : ", error.message);
  }
}
