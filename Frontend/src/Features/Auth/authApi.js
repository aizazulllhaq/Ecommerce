import axios from "axios";

export async function signUpUser(data) {
  try {
    const response = await axios.post("http://localhost:8000/users", data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.log("Error Occurred : ", error.message);
  }
}

export async function signInUser(data) {
  const email = data.email;
  const password = data.password;
  try {
    const response = await axios.get(
      `http://localhost:8000/users?email=${email}`
    );
    if (response.data.length) {
      if (password === response.data[0].password) {
        return response.data[0];
      } else {
        throw new Error("Invalid Credentials");
      }
    } else {
      throw new Error("User Not Found");
    }
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function updateUser(data) {
  try {
    const response = await axios.patch(
      `http://localhost:8000/users/${data.id}`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log("update user : ", response);
    return response.data;
  } catch (error) {
    console.log(error);
    console.log("Error Occurred :", error.message);
  }
}
