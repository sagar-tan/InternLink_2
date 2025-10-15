import axios from "axios";

// Create an Axios instance
const apiClient = axios.create({
  baseURL: "http://localhost:8080/api", // Your Spring Boot base URL
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor: attach JWT and log
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    console.log("[apiClient] Request URL:", config.url);
    console.log("[apiClient] Method:", config.method);
    console.log("[apiClient] Original headers:", config.headers);
    if (token) {
      console.log("[apiClient] Attaching token:", token);
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      console.log("[apiClient] No token found in localStorage");
    }
    return config;
  },
  (error) => {
    console.error("[apiClient] Request error:", error);
    return Promise.reject(error);
  }
);

// Response interceptor: log response and handle auth
apiClient.interceptors.response.use(
  (response) => {
    console.log("[apiClient] Response received:", response);
    return response;
  },
  (error) => {
    if (error.response) {
      console.error("[apiClient] Response error:", error.response.status, error.response.data);
      if (error.response.status === 401) {
        console.warn("[apiClient] Session expired. Redirecting to login...");
        localStorage.removeItem("token");
        window.location.href = "/login"; // redirect on auth fail
      }
    } else {
      console.error("[apiClient] Network / CORS error:", error.message);
    }
    return Promise.reject(error);
  }
);

export default apiClient;
