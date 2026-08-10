import axiosClient from "./axiosClient";

export const fetchEmailTemplates = () => axiosClient.get("/email-templates").then((res) => res.data);
export const updateEmailTemplateRequest = (key, payload) =>
  axiosClient.put(`/email-templates/${key}`, payload).then((res) => res.data);