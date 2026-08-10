import axiosClient from "./axiosClient";

export const fetchEmployeeDashboard = () => axiosClient.get("/employee/dashboard").then((res) => res.data);
export const fetchMyProfile = () => axiosClient.get("/employee/profile").then((res) => res.data);
export const fetchMyNotifications = () => axiosClient.get("/employee/notifications").then((res) => res.data);
export const markNotificationReadRequest = (id) => axiosClient.patch(`/employee/notifications/${id}/read`).then((res) => res.data);
export const fetchKnowledgeHub = () => axiosClient.get("/employee/knowledge-hub").then((res) => res.data);
export const fetchMyCalendar = () => axiosClient.get("/employee/calendar").then((res) => res.data);
export const submitFeedbackRequest = (payload) => axiosClient.post("/employee/feedback", payload).then((res) => res.data);