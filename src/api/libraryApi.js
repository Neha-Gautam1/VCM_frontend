import axiosClient from "./axiosClient";

export const fetchLibraryResources = (params) => axiosClient.get("/library", { params }).then((res) => res.data);

export const createLibraryResourceRequest = (payload, thumbnailFile) => {
  const formData = new FormData();
  Object.entries(payload).forEach(([key, value]) => formData.append(key, value));
  if (thumbnailFile) formData.append("thumbnail", thumbnailFile);
  return axiosClient
    .post("/library", formData, { headers: { "Content-Type": "multipart/form-data" } })
    .then((res) => res.data);
};

export const deleteLibraryResourceRequest = (id) => axiosClient.delete(`/library/${id}`).then((res) => res.data);