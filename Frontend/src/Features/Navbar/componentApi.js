import axios from "axios";

export async function getUsers() {
  try {
    const response = await axios.get("http://localhost:8000/users");
    return response.data;
  } catch (error) {
    console.log("Error Occurred : ", error);
  }
}
