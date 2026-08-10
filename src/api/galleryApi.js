import axiosClient from "./axiosClient";

export const fetchGalleryImages = (params) => axiosClient.get("/gallery", { params }).then((res) => res.data);

// Uses FormData because this is a real file upload, not a JSON body
export const uploadGalleryImageRequest = (file, title, category) => {
  const formData = new FormData();
  formData.append("image", file);
  formData.append("title", title);
  formData.append("category", category);
  return axiosClient
    .post("/gallery", formData, { headers: { "Content-Type": "multipart/form-data" } })
    .then((res) => res.data);
};

export const deleteGalleryImageRequest = (id) => axiosClient.delete(`/gallery/${id}`).then((res) => res.data);