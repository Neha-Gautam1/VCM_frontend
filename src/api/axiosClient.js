import axios from "axios";

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: { "Content-Type": "application/json" },
});

// Attach the JWT to every outgoing request automatically
axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("vcm_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle expired/invalid tokens and maintenance mode globally,
// so individual pages don't each need to check for these cases.
axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("vcm_token");
      localStorage.removeItem("vcm_user");
      window.location.href = "/login";
    }
    if (error.response?.status === 503 && error.response?.data?.maintenanceMode) {
      // A dedicated MaintenancePage could be routed to here instead, if desired
      alert(error.response.data.message || "The portal is under maintenance.");
    }
    return Promise.reject(error);
  }
);

export default axiosClient;