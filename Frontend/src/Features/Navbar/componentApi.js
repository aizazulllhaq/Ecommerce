import axios from "axios";
import apiClient from "../Common/apiClient";

export async function getUsers() {
  try {
    const response = await apiClient.get("/users");
    return response.data;
  } catch (error) {
    console.log("Error Occurred : ", error);
  }
}
