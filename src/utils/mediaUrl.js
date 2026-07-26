const API_ORIGIN = import.meta.env.VITE_API_URL.replace("/api", "");

// Prefixes relative upload paths (e.g. "/uploads/123.jpg") with the backend's origin,
// while leaving already-absolute URLs (e.g. seeded Unsplash links) untouched.
export const mediaUrl = (path) => {
  if (!path) return "";
  return path.startsWith("http") ? path : `${API_ORIGIN}${path}`;
};