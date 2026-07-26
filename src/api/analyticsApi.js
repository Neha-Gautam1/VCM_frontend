import axiosClient from "./axiosClient";

export const fetchAnalyticsSummary = () => axiosClient.get("/analytics/summary").then((res) => res.data);
export const fetchEmployeeGrowth = () => axiosClient.get("/analytics/employee-growth").then((res) => res.data);
export const fetchDepartmentActivity = () => axiosClient.get("/analytics/department-activity").then((res) => res.data);
export const fetchPortalVisits = () => axiosClient.get("/analytics/portal-visits").then((res) => res.data);
export const fetchMonthlyLogins = () => axiosClient.get("/analytics/monthly-logins").then((res) => res.data);
export const fetchRoleDistribution = () => axiosClient.get("/analytics/role-distribution").then((res) => res.data);