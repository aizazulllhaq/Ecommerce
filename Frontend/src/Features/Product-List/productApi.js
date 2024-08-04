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
  console.log("sort : ", sort);
  try {
    const response = await axios.get(
      `http://localhost:8000/products?${queryString}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
    console.log("Error Occurred : ", error.message);
  }
}
