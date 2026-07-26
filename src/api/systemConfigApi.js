import axiosClient from "./axiosClient";

export const fetchSystemConfig = () => axiosClient.get("/system-config").then((res) => res.data);
export const updateSystemConfigRequest = (payload) => axiosClient.put("/system-config", payload).then((res) => res.data);