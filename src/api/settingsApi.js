import axiosClient from "./axiosClient";

export const updateProfileRequest = (payload) => axiosClient.put("/auth/me", payload).then((res) => res.data);

export const changePasswordRequest = (currentPassword, newPassword) =>
  axiosClient.put("/auth/change-password", { currentPassword, newPassword }).then((res) => res.data);