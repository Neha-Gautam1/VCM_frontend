import axiosClient from "./axiosClient";

export const fetchPermissionMatrix = () => axiosClient.get("/permissions").then((res) => res.data);

export const togglePermissionRequest = (roleName, moduleName, action, value) =>
  axiosClient.put("/permissions", { roleName, moduleName, action, value }).then((res) => res.data);