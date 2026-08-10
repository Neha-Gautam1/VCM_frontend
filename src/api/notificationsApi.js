import axiosClient from "./axiosClient";

export const fetchNotificationHistory = () => axiosClient.get("/notifications/history").then((res) => res.data);
export const sendNotificationRequest = (payload) => axiosClient.post("/notifications", payload).then((res) => res.data);