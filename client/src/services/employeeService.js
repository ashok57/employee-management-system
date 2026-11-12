import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api/employees",
});

API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// GET Employees
export const getEmployees = () => API.get("/");

export const createEmployee = (employeeData) => API.post("/", employeeData);

export const updateEmployee = (id, employeeData) =>
  API.put(`/${id}`, employeeData);

export const deleteEmployee = (id) => API.delete(`/${id}`);
