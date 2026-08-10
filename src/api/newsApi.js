import axiosClient from "./axiosClient";

export const fetchNews = (params) => axiosClient.get("/news", { params }).then((res) => res.data);
export const createNewsRequest = (payload) => axiosClient.post("/news", payload).then((res) => res.data);
export const toggleNewsPublishRequest = (id) => axiosClient.patch(`/news/${id}/publish`).then((res) => res.data);
export const deleteNewsRequest = (id) => axiosClient.delete(`/news/${id}`).then((res) => res.data);