import axiosClient from "./axiosClient";

export const fetchAnnouncements = (params) => axiosClient.get("/announcements", { params }).then((res) => res.data);
export const createAnnouncementRequest = (payload) => axiosClient.post("/announcements", payload).then((res) => res.data);
export const toggleAnnouncementPublishRequest = (id) => axiosClient.patch(`/announcements/${id}/publish`).then((res) => res.data);
export const deleteAnnouncementRequest = (id) => axiosClient.delete(`/announcements/${id}`).then((res) => res.data);