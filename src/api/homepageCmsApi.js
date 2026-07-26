import axiosClient from "./axiosClient";

export const fetchHomepageCms = () => axiosClient.get("/homepage-cms").then((res) => res.data);

export const updateBannerRequest = (payload) => axiosClient.put("/homepage-cms/banner", payload).then((res) => res.data);
export const updateAboutRequest = (payload) => axiosClient.put("/homepage-cms/about", payload).then((res) => res.data);
export const updateVisionRequest = (payload) => axiosClient.put("/homepage-cms/vision", payload).then((res) => res.data);
export const updateMissionRequest = (payload) => axiosClient.put("/homepage-cms/mission", payload).then((res) => res.data);
export const updateLeadershipRequest = (payload) => axiosClient.put("/homepage-cms/leadership", payload).then((res) => res.data);

export const addCardRequest = (payload) => axiosClient.post("/homepage-cms/cards", payload).then((res) => res.data);
export const updateCardRequest = (id, payload) => axiosClient.put(`/homepage-cms/cards/${id}`, payload).then((res) => res.data);
export const deleteCardRequest = (id) => axiosClient.delete(`/homepage-cms/cards/${id}`).then((res) => res.data);