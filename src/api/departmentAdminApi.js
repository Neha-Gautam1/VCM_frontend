import axiosClient from "./axiosClient";

export const fetchDeptDashboard = () => axiosClient.get("/dept-admin/dashboard").then((res) => res.data);
export const fetchDeptEmployees = () => axiosClient.get("/dept-admin/employees").then((res) => res.data);
export const fetchDeptAnnouncements = () => axiosClient.get("/dept-admin/announcements").then((res) => res.data);

export const fetchDeptDocuments = () => axiosClient.get("/dept-admin/documents").then((res) => res.data);
export const uploadDeptDocumentRequest = (title, file) => {
  const formData = new FormData();
  formData.append("title", title);
  formData.append("file", file);
  return axiosClient
    .post("/dept-admin/documents", formData, { headers: { "Content-Type": "multipart/form-data" } })
    .then((res) => res.data);
};

export const fetchDeptEvents = () => axiosClient.get("/dept-admin/events").then((res) => res.data);
export const createDeptEventRequest = (payload) => axiosClient.post("/dept-admin/events", payload).then((res) => res.data);

export const fetchDeptSuggestions = () => axiosClient.get("/dept-admin/suggestions").then((res) => res.data);
export const updateSuggestionStatusRequest = (id, status) =>
  axiosClient.patch(`/dept-admin/suggestions/${id}`, { status }).then((res) => res.data);

export const fetchDeptReports = () => axiosClient.get("/dept-admin/reports").then((res) => res.data);