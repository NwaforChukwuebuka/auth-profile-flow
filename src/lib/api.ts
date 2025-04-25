
import axios from "axios";
import { toast } from "@/components/ui/sonner";

const API_URL = "http://localhost:3001"; // Change this to your actual API URL

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true, // Important for cookies/session
  headers: {
    "Content-Type": "application/json",
  },
});

// Add response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message = error.response?.data?.message || "An error occurred";
    toast.error(message);
    return Promise.reject(error);
  }
);

// Auth endpoints
export const authApi = {
  signup: (userData: SignupData) => api.post("/signup", userData),
  login: (credentials: LoginCredentials) => api.post("/login", credentials),
  logout: () => api.post("/logout"),
  getProfile: () => api.get("/me"),
};

// Types
export interface SignupData {
  name: string;
  email: string;
  phone: string;
  age: number;
  password: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  age: number;
  firstName: string;
  lastName: string;
  emailDomain: string;
}

export default api;
