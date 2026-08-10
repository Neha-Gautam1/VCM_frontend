import axiosClient from "./axiosClient";

export const fetchAuditLogs = (params) => axiosClient.get("/audit-logs", { params }).then((res) => res.data);

// CSV export — same blob-download consideration as backups above
export const exportAuditLogsRequest = async (params) => {
  const response = await axiosClient.get("/audit-logs/export", { params, responseType: "blob" });
  const url = window.URL.createObjectURL(new Blob([response.data]));
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", "vcm_audit_logs.csv");
  document.body.appendChild(link);
  link.click();
  link.remove();
};