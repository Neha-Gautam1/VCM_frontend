import axiosClient from "./axiosClient";

export const fetchOrgChart = () => axiosClient.get("/org-chart").then((res) => res.data);
export const addOrgChartNodeRequest = (payload) => axiosClient.post("/org-chart", payload).then((res) => res.data);
export const deleteOrgChartNodeRequest = (id) => axiosClient.delete(`/org-chart/${id}`).then((res) => res.data);