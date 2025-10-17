import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5001/api", // ✅ make sure this port matches backend
  headers: { "Content-Type": "application/json" },
});

// ✅ Attach JWT token from localStorage for all requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
