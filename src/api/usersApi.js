import axiosClient from "./axiosClient";

export const fetchUsers = (params) => axiosClient.get("/users", { params }).then((res) => res.data);
export const createUserRequest = (payload) => axiosClient.post("/users", payload).then((res) => res.data);
export const updateUserRequest = (id, payload) => axiosClient.put(`/users/${id}`, payload).then((res) => res.data);
export const deleteUserRequest = (id) => axiosClient.delete(`/users/${id}`).then((res) => res.data);