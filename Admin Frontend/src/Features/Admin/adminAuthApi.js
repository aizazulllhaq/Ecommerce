import apiClient from "../Common/apiClient";

export async function loginAdmin(data) {
  try {
    const response = await apiClient.post("/auth/admin/signin", data, {
      Headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data.data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
}

export async function getAdminInfo() {
  try {
    const response = await apiClient.get(`/admin/info`);
    return response.data.data;
  } catch (error) {
    console.log("Error Occurred : ", error.message);
  }
}

export async function checkAuth() {
  try {
    const response = await apiClient.get("/auth/admin/check");
    return response.data;
  } catch (error) {
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
