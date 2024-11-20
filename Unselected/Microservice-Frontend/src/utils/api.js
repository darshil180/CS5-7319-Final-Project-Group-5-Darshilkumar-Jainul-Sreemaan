import axios from "axios";
import { useNavigate } from "react-router-dom";

const apiClient = axios.create({
  baseURL: "http://localhost:5001/api",
  headers: { "Content-Type": "application/json" },
});

// Add an interceptor to handle authentication errors globally
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      const navigate = useNavigate();
      navigate("/login"); // Redirect to login page if unauthorized
    }
    return Promise.reject(error);
  }
);

export const login = (credentials) => apiClient.post("/auth/login", credentials);
export const register = (userData) => apiClient.post("/auth/register", userData);
export const fetchUser = () => apiClient.get("/auth/me");

export default apiClient;
