import axios from "axios";
import apiClient from "../Common/apiClient";

export async function addProduct(newProduct) {
  try {
    const response = await apiClient.post("/product/new", newProduct, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.log("Error Occurred : ", error.message);
  }
}

export async function updateProduct(updatedProduct) {
  try {
    const response = await apiClient.patch(
      `/product/edit/${updatedProduct.id}`,
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
    const response = await apiClient.get(`/product?${queryString}`);

    const totalItems = response.headers["x-total-count"];
    return { data: response.data.data, totalItems: totalItems };
  } catch (error) {
    console.log("Error Occurred : ", error.message);
  }
}

export async function getAllCategries() {
  try {
    const response = await apiClient.get("/categories");
    return {
      data: response.data.data,
    };
  } catch (error) {
    console.log("Error Occurred : ", error.message);
  }
}

export async function getAllBrands() {
  try {
    const response = await apiClient.get("/brands");
    return {
      data: response.data.data,
    };
  } catch (error) {
    console.log("Error Occurred : ", error.message);
  }
}

export async function getProductById(id) {
  try {
    const response = await apiClient.get(`/product/${id}`);
    return response.data.data;
  } catch (error) {
    console.log("Error Occurred : ", error.message);
  }
}

export async function deleteProductTemporary(id) {
  try {
    const response = await apiClient.put(`/product/temp/${id}`);
    return response.data;
  } catch (error) {
    console.log("Error Occurred : ", error.message);
  }
}

export async function deleteProductPermanently(id) {
  try {
    const response = await apiClient.delete(`/product/del/${id}`);
    return response.data;
  } catch (error) {
    console.log("Error Occurred : ", error.message);
  }
}
