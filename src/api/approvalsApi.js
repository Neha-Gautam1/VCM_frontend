import axiosClient from "./axiosClient";

export const fetchApprovals = (params) => axiosClient.get("/approvals", { params }).then((res) => res.data);
export const approveRequestApi = (id) => axiosClient.patch(`/approvals/${id}/approve`).then((res) => res.data);
export const rejectRequestApi = (id, reason) =>
  axiosClient.patch(`/approvals/${id}/reject`, { reason }).then((res) => res.data);