
import { useState } from "react";

import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import Employees from "./pages/Employees";
import AddEmployee from "./pages/AddEmployee";

function App() {
  // Main employee state
  const [employees, setEmployees] = useState([
    {
      id: "EMP001",
      name: "Rahul Sharma",
      email: "rahul@gmail.com",
      phone: "9876543210",
      department: "IT",
      designation: "Frontend Developer",
      joiningDate: "2025-01-10",
      salary: 35000,
      status: "Active"
    },
    {
      id: "EMP002",
      name: "Priya Singh",
      email: "priya@gmail.com",
      phone: "9876543211",
      department: "HR",
      designation: "HR Manager",
      joiningDate: "2024-06-15",
      salary: 45000,
      status: "Active"
    }
  ]);

  // Add employee function
  const handleAddEmployee = (newEmployee) => {
    setEmployees((prev) => [...prev, newEmployee]);
  };

  return (
    <BrowserRouter>
      <div className="app-layout">
        <Sidebar />

        <main className="main-content">
          <Routes>
            <Route
              path="/"
              element={<Dashboard employees={employees} />}
            />

            <Route
              path="/employees"
              element={
                <Employees
                  employees={employees}
                  setEmployees={setEmployees}
                />
              }
            />

            <Route
              path="/add-employee"
              element={
                <AddEmployee
                  onAddEmployee={handleAddEmployee}
                />
              }
            />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
