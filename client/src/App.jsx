
import { useState, useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";

import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import Employees from "./pages/Employees";
import AddEmployee from "./pages/AddEmployee";
import EditEmployee from "./pages/EditEmployee";

import {
  getEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee
} from "./services/employeeService";


function App() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // GET EMPLOYEES
 
const fetchEmployees = async () => {
  try {
    setLoading(true);
    setError("");

    const response = await getEmployees();

    console.log("FULL RESPONSE:", response);
    console.log("RESPONSE DATA:", response.data);

    // Extract employee array FIRST
    const employeeData = response.data?.data;

    // Now check the array
    console.log(
      "Is employeeData an array:",
      Array.isArray(employeeData)
    );

    if (!Array.isArray(employeeData)) {
      console.error("Unexpected API structure:", response.data);
      throw new Error("Employee data is not an array.");
    }

    const employeeList = employeeData.map((employee) => ({
      ...employee,
      id: employee._id || employee.id
    }));

    console.log("Final Employee List:", employeeList);

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
};


  useEffect(() => {
    fetchEmployees();
  }, []);

  // ADD EMPLOYEE
  const handleAddEmployee = async (newEmployee) => {
    try {

      console.log("Sending employee data : ", newEmployee);

      const response = await createEmployee(newEmployee);


      console.log("POST API RESPONSE : ", response.data);

      const savedEmployee = {
        ...response.data.data,
        id: response.data.data._id
      };

      setEmployees((prev) => [...prev, savedEmployee]);

      return savedEmployee;
    
    } catch (err) {
      console.error("Error adding employee:", err.response?.data || err);
      throw err;
    }
  };

  // UPDATE EMPLOYEE
  const handleUpdateEmployee = async (id, updatedEmployee) => {
    try {
      const response = await updateEmployee(id, updatedEmployee);

      const savedEmployee = {
        ...response.data.data,
        id: response.data.data._id
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
    <BrowserRouter>
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
                  onDeleteEmployee={handleDeleteEmployee}
                />
              }
            />

            <Route
              path="/add-employee"
              element={
                <AddEmployee
                  onAddEmployee={handleAddEmployee}
                  employees={employees}
                />
              }
            />

            <Route
              path="/edit-employee/:id"
              element={
                <EditEmployee
                  employees={employees}
                  onUpdateEmployee={handleUpdateEmployee}
                />
              }
            />

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>

        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
