import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
  useOutletContext,
} from "react-router-dom";

import { useState, useEffect, useCallback } from "react";
import Sidebar from "./components/Sidebar";

import Dashboard from "./pages/Dashboard";
import Employees from "./pages/Employees";
import AddEmployee from "./pages/AddEmployee";
import EditEmployee from "./pages/EditEmployee";
import Login from "./pages/Login";

import ProtectedRoute from "./components/ProtectedRoute";
import { useAuth } from "./context/AuthContext";

import {
  getEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee,
} from "./services/employeeService";


// Main application layout
function AppLayout() {
  const { user, authLoading } = useAuth();

  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // GET EMPLOYEES
  const fetchEmployees = useCallback(async () => {
    if (user?.role !== "admin") return;

    try {
      setLoading(true);
      setError("");

      const response = await getEmployees();

      const employeeData = response.data?.data;

      if (!Array.isArray(employeeData)) {
        throw new Error("Employee data is not an array.");
      }

      const employeeList = employeeData.map((employee) => ({
        ...employee,
        id: employee._id || employee.id,
      }));

      setEmployees(employeeList);

    } catch (err) {
      console.error("Error fetching employees:", err);

      setError(
        err.response?.data?.message ||
        err.message ||
        "Unable to load employees."
      );

    } finally {
      setLoading(false);
    }
  }, [user?.role]);


  // Fetch employees only for Admin
  useEffect(() => {
    if (user?.role === "admin") {
      fetchEmployees();
    } else {
      setEmployees([]);
      setLoading(false);
      setError("");
    }
  }, [authLoading, user?.role, fetchEmployees]);


  // ADD EMPLOYEE
  const handleAddEmployee = async (newEmployee) => {
    try {
      const response = await createEmployee(newEmployee);

      const savedEmployee = {
        ...response.data.data,
        id: response.data.data._id,
      };

      setEmployees((prev) => [...prev, savedEmployee]);

      return savedEmployee;

    } catch (err) {
      console.error("Error adding employee:", err);
      throw err;
    }
  };


  // UPDATE EMPLOYEE
  const handleUpdateEmployee = async (id, updatedEmployee) => {
    try {
      const response = await updateEmployee(id, updatedEmployee);

      const savedEmployee = {
        ...response.data.data,
        id: response.data.data._id,
      };

      setEmployees((prev) =>
        prev.map((employee) =>
          employee.id === id ? savedEmployee : employee
        )
      );

    } catch (err) {
      console.error("Error updating employee:", err);
      throw err;
    }
  };


  // DELETE EMPLOYEE
  const handleDeleteEmployee = async (id) => {
    try {
      await deleteEmployee(id);

      setEmployees((prev) =>
        prev.filter((employee) => employee.id !== id)
      );

    } catch (err) {
      console.error("Error deleting employee:", err);
      throw err;
    }
  };


  return (
    <div className="app-layout">

      <Sidebar />

      <main className="main-content">

        {loading && (
          <div className="status-message">
            Loading employees...
          </div>
        )}

        {error && (
          <div className="error-message">
            {error}

            <button onClick={fetchEmployees}>
              Retry
            </button>
          </div>
        )}

        <Outlet
          context={{
            employees,
            handleAddEmployee,
            handleUpdateEmployee,
            handleDeleteEmployee,
          }}
        />

      </main>
    </div>
  );
}


// Application routes
function App() {
  return (
    <BrowserRouter>

      <Routes>

        {/* Public Login Route */}
        <Route
          path="/login"
          element={<Login />}
        />

        {/* Protected Application */}
        <Route
          element={
            <ProtectedRoute>
              <AppLayout />
            </ProtectedRoute>
          }
        >

          {/* Dashboard: Admin and Employee */}
          <Route
            path="/"
            element={
              <DashboardWrapper />
            }
          />

          {/* Admin-only routes */}
          <Route
            path="/employees"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <EmployeesWrapper />
              </ProtectedRoute>
            }
          />

          <Route
            path="/add-employee"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <AddEmployeeWrapper />
              </ProtectedRoute>
            }
          />

          <Route
            path="/edit-employee/:id"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <EditEmployeeWrapper />
              </ProtectedRoute>
            }
          />

        </Route>

        {/* Unknown routes */}
        <Route
          path="*"
          element={<Navigate to="/" replace />}
        />

      </Routes>

    </BrowserRouter>
  );
}


// Get data from AppLayout using Outlet context

function DashboardWrapper() {
  const { employees } = useOutletContext();

  return <Dashboard employees={employees} />;
}

function EmployeesWrapper() {
  const { employees, handleDeleteEmployee } = useOutletContext();

  return (
    <Employees
      employees={employees}
      onDeleteEmployee={handleDeleteEmployee}
    />
  );
}

function AddEmployeeWrapper() {
  const { employees, handleAddEmployee } = useOutletContext();

  return (
    <AddEmployee
      employees={employees}
      onAddEmployee={handleAddEmployee}
    />
  );
}

function EditEmployeeWrapper() {
  const {
    employees,
    handleUpdateEmployee,
  } = useOutletContext();

  return (
    <EditEmployee
      employees={employees}
      onUpdateEmployee={handleUpdateEmployee}
    />
  );
}

export default App;
