import axiosClient from "./axiosClient";

export const fetchRoles = () => axiosClient.get("/roles").then((res) => res.data);
export const createRoleRequest = (payload) => axiosClient.post("/roles", payload).then((res) => res.data);
export const updateRoleRequest = (id, payload) => axiosClient.put(`/roles/${id}`, payload).then((res) => res.data);
export const deleteRoleRequest = (id) => axiosClient.delete(`/roles/${id}`).then((res) => res.data);