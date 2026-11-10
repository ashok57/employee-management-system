
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import EmployeeTable from "../components/EmployeeTable";
import "./Employees.css";

const PAGE_SIZE = 10;

function Employees({ employees = [], onDeleteEmployee }) {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState("All");
  const [status, setStatus] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [deleteError, setDeleteError] = useState("");

  // Get unique departments from employee records
  const departments = useMemo(() => {
    return [
      ...new Set(
        employees
          .map((employee) => employee.department)
          .filter(Boolean)
      ),
    ].sort();
  }, [employees]);

  // Search and filter employees
  const filteredEmployees = useMemo(() => {
    const searchText = search.trim().toLowerCase();

    return employees.filter((employee) => {
      const searchMatch =
        (employee.name || "").toLowerCase().includes(searchText) ||
        (employee.employeeId || "").toLowerCase().includes(searchText) ||
        (employee.email || "").toLowerCase().includes(searchText);

      const departmentMatch =
        department === "All" ||
        employee.department === department;

      const statusMatch =
        status === "All" ||
        employee.status === status;

      return searchMatch && departmentMatch && statusMatch;
    });
  }, [employees, search, department, status]);

  // Pagination calculations
  const totalPages = Math.ceil(filteredEmployees.length / PAGE_SIZE);

  // Prevent an invalid page after deleting or filtering records
  useEffect(() => {
    if (currentPage > Math.max(totalPages, 1)) {
      setCurrentPage(Math.max(totalPages, 1));
    }
  }, [currentPage, totalPages]);

  const startIndex = (currentPage - 1) * PAGE_SIZE;

  const currentEmployees = filteredEmployees.slice(
    startIndex,
    startIndex + PAGE_SIZE
  );

  const firstEmployee =
    filteredEmployees.length === 0 ? 0 : startIndex + 1;

  const lastEmployee = Math.min(
    startIndex + PAGE_SIZE,
    filteredEmployees.length
  );

  // Search handler
  const handleSearch = (value) => {
    setSearch(value);
    setCurrentPage(1);
  };

  // Filter handler
  const handleDepartment = (value) => {
    setDepartment(value);
    setCurrentPage(1);
  };

  const handleStatus = (value) => {
    setStatus(value);
    setCurrentPage(1);
  };

  // Clear all filters
  const clearFilters = () => {
    setSearch("");
    setDepartment("All");
    setStatus("All");
    setCurrentPage(1);
    setDeleteError("");
  };

  // Delete employee from MongoDB through App.jsx
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this employee?"
    );

    if (!confirmDelete) return;

    try {
      setDeleteError("");
      await onDeleteEmployee(id);
    } catch (error) {
      console.error("Delete failed:", error);

      setDeleteError(
        error.response?.data?.message ||
        "Unable to delete employee. Please try again."
      );
    }
  };

  // Navigate to edit page
  const handleEdit = (employee) => {
    const id = employee.id || employee._id;

    navigate(`/edit-employee/${id}`);
  };

  return (
    <div className="employees-page">

      {/* PAGE HEADER */}
      <div className="page-header">
        <div>
          <h1>Employees</h1>
          <p>Manage your organization's employees</p>
        </div>

        <button
          className="add-button"
          onClick={() => navigate("/add-employee")}
        >
          + Add Employee
        </button>
      </div>

      {/* SEARCH AND FILTERS */}
      <div className="employee-filters">

        <input
          type="text"
          placeholder="Search name, employee ID or email..."
          value={search}
          onChange={(e) => handleSearch(e.target.value)}
        />

        <select
          value={department}
          onChange={(e) => handleDepartment(e.target.value)}
        >
          <option value="All">All Departments</option>

          {departments.map((dept) => (
            <option key={dept} value={dept}>
              {dept}
            </option>
          ))}
        </select>

        <select
          value={status}
          onChange={(e) => handleStatus(e.target.value)}
        >
          <option value="All">All Status</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>

        <button
          className="clear-filter-button"
          onClick={clearFilters}
        >
          Clear Filters
        </button>

      </div>

      {/* ERROR MESSAGE */}
      {deleteError && (
        <div className="error-message">
          {deleteError}
        </div>
      )}

      {/* EMPLOYEE COUNT */}
      <div className="employee-count">
        <span>
          Showing <strong>{firstEmployee}-{lastEmployee}</strong> of{" "}
          <strong>{filteredEmployees.length}</strong> employees
        </span>

        <span>
          Total registered: {employees.length}
        </span>
      </div>

      {/* EMPLOYEE TABLE */}
      <EmployeeTable
        employees={currentEmployees}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {/* PAGINATION */}
      {totalPages > 1 && (
        <div className="pagination">

          <button
            onClick={() => setCurrentPage((prev) => prev - 1)}
            disabled={currentPage === 1}
          >
            ← Previous
          </button>

          <div className="pagination-pages">
            {Array.from(
              { length: totalPages },
              (_, index) => index + 1
            ).map((page) => (
              <button
                key={page}
                className={
                  currentPage === page ? "active-page" : ""
                }
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </button>
            ))}
          </div>

          <button
            onClick={() => setCurrentPage((prev) => prev + 1)}
            disabled={currentPage === totalPages}
          >
            Next →
          </button>

        </div>
      )}

    </div>
  );
}

export default Employees;
