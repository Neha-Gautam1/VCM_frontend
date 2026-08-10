import { createContext, useState, useEffect } from "react";
import { loginRequest, getMeRequest, logoutRequest } from "../api/authApi";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // On app load, if a token exists, verify it's still valid and restore the session
  useEffect(() => {
    const token = localStorage.getItem("vcm_token");
    if (!token) {
      setLoading(false);
      return;
    }

    getMeRequest()
      .then((res) => setUser(res.user))
      .catch(() => {
        localStorage.removeItem("vcm_token");
        localStorage.removeItem("vcm_user");
      })
      .finally(() => setLoading(false));
  }, []);

  const login = async (email, password) => {
    const res = await loginRequest(email, password); // throws on failure — let the Login page catch it
    localStorage.setItem("vcm_token", res.token);
    localStorage.setItem("vcm_user", JSON.stringify(res.user));
    setUser(res.user);
    return res.user;
  };

  const logout = async () => {
    try {
      await logoutRequest();
    } catch {
      // Even if the server call fails, still clear the local session
    }
    localStorage.removeItem("vcm_token");
    localStorage.removeItem("vcm_user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};