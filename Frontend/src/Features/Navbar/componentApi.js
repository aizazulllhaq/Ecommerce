import axios from "axios";
import apiClient from "../Common/apiClient";

export async function getUsers() {
  try {
    // const response = await apiClient.get("/users");
    const response = await axios.get("http://localhost:8000/users");
    return response.data;
  } catch (error) {
    console.log("Error Occurred : ", error.message);
  }
}
