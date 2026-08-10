import axiosClient from "./axiosClient";

export const fetchBackups = () => axiosClient.get("/backups").then((res) => res.data);
export const createBackupRequest = () => axiosClient.post("/backups").then((res) => res.data);
export const restoreBackupRequest = (id) => axiosClient.post(`/backups/${id}/restore`).then((res) => res.data);

// Fetches the file as a blob (so the auth header is properly attached),
// then triggers a real browser download — same pattern as the CSV export.
export const downloadBackupRequest = async (id, filename = "backup.sql") => {
  const response = await axiosClient.get(`/backups/${id}/download`, { responseType: "blob" });
  const url = window.URL.createObjectURL(new Blob([response.data]));
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", filename);
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.URL.revokeObjectURL(url);
};