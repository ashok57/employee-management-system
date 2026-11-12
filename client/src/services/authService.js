
import axios from "axios";

const AUTH_API = axios.create({
  baseURL: "http://localhost:5000/api/auth",
});

// Login API
export const loginUser = (credentials) => {
  return AUTH_API.post("/login", credentials);
};

// Get logged-in user
export const getLoggedInUser = (token) => {
  return AUTH_API.get("/me", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
