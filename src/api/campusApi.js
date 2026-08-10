import axiosClient from "./axiosClient";

export const fetchCampusOverview = () => axiosClient.get("/campus/overview").then((res) => res.data);

export const fetchBuildings = () => axiosClient.get("/campus/buildings").then((res) => res.data);
export const createBuildingRequest = (payload, imageFile) => {
  const formData = new FormData();
  Object.entries(payload).forEach(([key, value]) => formData.append(key, value));
  if (imageFile) formData.append("image", imageFile);
  return axiosClient
    .post("/campus/buildings", formData, { headers: { "Content-Type": "multipart/form-data" } })
    .then((res) => res.data);
};

export const fetchHostels = () => axiosClient.get("/campus/hostels").then((res) => res.data);
export const createHostelRequest = (payload) => axiosClient.post("/campus/hostels", payload).then((res) => res.data);
export const updateHostelOccupancyRequest = (id, occupancy) =>
  axiosClient.patch(`/campus/hostels/${id}/occupancy`, { occupancy }).then((res) => res.data);

export const fetchOffices = () => axiosClient.get("/campus/offices").then((res) => res.data);
export const createOfficeRequest = (payload) => axiosClient.post("/campus/offices", payload).then((res) => res.data);

export const fetchCampusGallery = () => axiosClient.get("/campus/gallery").then((res) => res.data);
export const uploadCampusGalleryImageRequest = (imageFile) => {
  const formData = new FormData();
  formData.append("image", imageFile);
  return axiosClient
    .post("/campus/gallery", formData, { headers: { "Content-Type": "multipart/form-data" } })
    .then((res) => res.data);
};