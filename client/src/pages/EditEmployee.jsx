import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function EditEmployee({ employees, setEmployees }) {
  const navigate = useNavigate();
  const { id } = useParams();

  // Find selected employee
  const employee = employees.find(
    (emp) => emp.id === id
  );

  // Form state
  const [formData, setFormData] = useState(() => {
    if (!employee) return {};

    return {
      name: employee.name,
      email: employee.email,
      phone: employee.phone,
      department: employee.department,
      designation: employee.designation,
      joiningDate: employee.joiningDate,
      salary: employee.salary,
      status: employee.status
    };
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  // Update employee
  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.phone.trim() ||
      !formData.salary
    ) {
      alert("Please fill in all required fields.");
      return;
    }

    setEmployees((prevEmployees) =>
      prevEmployees.map((emp) =>
        emp.id === id
          ? {
              ...emp,
              ...formData,
              salary: Number(formData.salary)
            }
          : emp
      )
    );

    alert("Employee updated successfully!");

    navigate("/employees");
  };

  // Employee not found
  if (!employee) {
    return (
      <div className="edit-employee-page">
        <h2>Employee not found</h2>
        <button onClick={() => navigate("/employees")}>
          Back to Employees
        </button>
      </div>
    );
  }

  return (
    <div className="edit-employee-page">

      <div className="page-header">
        <div>
          <h1>Edit Employee</h1>
          <p>Update employee information</p>
        </div>
      </div>

      <form className="employee-form" onSubmit={handleSubmit}>

        <div className="form-group">
          <label>Employee ID</label>
          <input value={employee.id} disabled />
        </div>

        <div className="form-group">
          <label>Full Name</label>
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Phone</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Department</label>
          <select
            name="department"
            value={formData.department}
            onChange={handleChange}
          >
            <option value="IT">IT</option>
            <option value="HR">HR</option>
            <option value="Finance">Finance</option>
            <option value="Sales">Sales</option>
            <option value="Marketing">Marketing</option>
          </select>
        </div>

        <div className="form-group">
          <label>Designation</label>
          <input
            name="designation"
            value={formData.designation}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Joining Date</label>
          <input
            type="date"
            name="joiningDate"
            value={formData.joiningDate}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Salary (₹)</label>
          <input
            type="number"
            name="salary"
            value={formData.salary}
            onChange={handleChange}
            min="0"
            required
          />
        </div>

        <div className="form-group">
          <label>Status</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>

        <div className="form-actions">
          <button type="submit" className="save-button">
            Save Changes
          </button>

          <button
            type="button"
            className="cancel-button"
            onClick={() => navigate("/employees")}
          >
            Cancel
          </button>
        </div>

      </form>
    </div>
  );
}

export default EditEmployee;