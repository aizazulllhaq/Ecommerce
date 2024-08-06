import axios from "axios";

export async function signUpUser(data) {
  try {
    const response = await axios.post("http://localhost:8000/users", data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log("signup response",response);
    return response.data;
  } catch (error) {
    console.log("Error Occurred : ", error.message);
  }
}

export async function signInUser(data) {
  try {
    const response = await axios.post("http://localhost:8000/users", data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log("login response ", response);
    return response.data;
  } catch (error) {
    console.log("Error Occurred : ", error.message);
  }
}
