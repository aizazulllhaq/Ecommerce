import axios from "axios";

export async function loginAdmin(data) {
  console.log(data);
  try {
    const response = await axios.post(
      "http://localhost:3000/api/v1/auth/admin/signin",
      data,
      {
        Headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data.data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
}
