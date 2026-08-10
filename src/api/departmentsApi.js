import axiosClient from "./axiosClient";

export const fetchDepartments = (search) => axiosClient.get("/departments", { params: { search } }).then((res) => res.data);
export const createDepartmentRequest = (payload) => axiosClient.post("/departments", payload).then((res) => res.data);
export const updateDepartmentRequest = (id, payload) => axiosClient.put(`/departments/${id}`, payload).then((res) => res.data);
export const deleteDepartmentRequest = (id) => axiosClient.delete(`/departments/${id}`).then((res) => res.data);