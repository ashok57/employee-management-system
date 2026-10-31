
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import EmployeeTable from "../components/EmployeeTable";

function Employees({ employees, setEmployees }) {
  const navigate = useNavigate();

  // Search state
  const [search, setSearch] = useState("");

  // Filter states
  const [department, setDepartment] = useState("All");
  const [status, setStatus] = useState("All");

  // Search and filter employees
  const filteredEmployees = employees.filter((employee) => {
    const searchMatch =
      employee.name.toLowerCase().includes(search.toLowerCase()) ||
      employee.id.toLowerCase().includes(search.toLowerCase()) ||
      employee.email.toLowerCase().includes(search.toLowerCase());

    const departmentMatch =
      department === "All" || employee.department === department;

    const statusMatch =
      status === "All" || employee.status === status;

    return searchMatch && departmentMatch && statusMatch;
  });

  // Delete employee
  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this employee?"
    );

    if (confirmDelete) {
      setEmployees((prevEmployees) =>
        prevEmployees.filter((employee) => employee.id !== id)
      );
    }
  };

  // Edit employee
const handleEdit = (employee) => {
  navigate(`/edit-employee/${employee.id}`);
};

  return (
    <div className="employees-page">

      {/* Page Header */}
      <div className="page-header">
        <div>
          <h1>Employees</h1>
          <p>Manage your organisation's employees</p>
        </div>

        <button
          className="add-button"
          onClick={() => navigate("/add-employee")}
        >
          + Add Employee
        </button>
      </div>

      {/* Search and Filters */}
      <div className="employee-filters">

        <input
          type="text"
          placeholder="Search by name, ID or email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
        >
          <option value="All">All Departments</option>
          <option value="IT">IT</option>
          <option value="HR">HR</option>
          <option value="Finance">Finance</option>
          <option value="Sales">Sales</option>
          <option value="Marketing">Marketing</option>
        </select>

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="All">All Status</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>

      </div>

      {/* Employee Count */}
      <div className="employee-count">
        Showing {filteredEmployees.length} of {employees.length} employees
      </div>

      {/* Employee Table */}
      <EmployeeTable
        employees={filteredEmployees}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

    </div>
  );
}

export default Employees;
