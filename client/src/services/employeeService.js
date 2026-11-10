import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api/employees",
});

export const getEmployees = () => API.get("/");

export const createEmployee = (employeeData) => API.post("/", employeeData);

export const updateEmployee = (id, employeeData) =>
  API.put(`/${id}`, employeeData);

export const deleteEmployee = (id) => API.delete(`/${id}`);
