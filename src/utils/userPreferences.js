import { notifications } from "../pages/user/data/mockData";

export const USER_PREFERENCES_KEY = "vcm_user_preferences";
export const USER_PREFERENCES_CHANGED = "vcm-user-preferences-changed";

export const defaultUserPreferences = {
  emailBookings: true,
  emailEvents: true,
  emailDonations: false,
  emailNews: true,
  smsBookings: true,
  smsEvents: false,
  darkMode: false,
  language: "English",
  twoFactor: false,
  publicProfile: true,
};

export const getUserPreferences = () => {
  try {
    return { ...defaultUserPreferences, ...JSON.parse(localStorage.getItem(USER_PREFERENCES_KEY) || "{}") };
  } catch {
    return defaultUserPreferences;
  }
};

export const saveUserPreferences = (preferences) => {
  localStorage.setItem(USER_PREFERENCES_KEY, JSON.stringify(preferences));
  document.documentElement.classList.toggle("portal-dark", preferences.darkMode);
  document.documentElement.lang = preferences.language === "Hindi" ? "hi" : "en";
  window.dispatchEvent(new CustomEvent(USER_PREFERENCES_CHANGED, { detail: preferences }));
};

export const getUnreadNotificationCount = (preferences = getUserPreferences()) =>
  notifications.filter((notification) => {
    if (notification.isRead) return false;
    if (notification.type === "booking") return preferences.emailBookings;
    if (notification.type === "event") return preferences.emailEvents;
    if (notification.type === "donation") return preferences.emailDonations;
    return preferences.emailNews;
  }).length;
