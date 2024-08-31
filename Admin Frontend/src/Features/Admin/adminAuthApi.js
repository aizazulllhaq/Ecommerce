import apiClient from "../Common/apiClient";

export async function loginAdmin(data) {
  try {
    const response = await apiClient.post("/admin/signin", data, {
      Headers: {
        "Content-Type": "application/json",
      },
    });
    console.log("signin :", response);
    return response.data.data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
}

export async function getAdminInfo() {
  try {
    const response = await apiClient.get(`/admin/info`);
    console.log("info : ", response);
    return response.data.data;
  } catch (error) {
    console.log("Error Occurred : ", error.message);
  }
}

export async function checkAuth() {
  try {
    const response = await apiClient.get("/admin/check");
    console.log("check", response);
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error(error.message);
  }
}

export async function AdminLogout() {
  try {
    const response = await apiClient.post("/admin/logout");
    return response.data;
  } catch (error) {
    console.log("Error Occurred : ", error.message);
  }
}
