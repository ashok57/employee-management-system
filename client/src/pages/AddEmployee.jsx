import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AddEmployee({ onAddEmployee, employees }) {

  const navigate = useNavigate();

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    department: "IT",
    designation: "",
    joiningDate: "",
    salary: "",
    status: "Active"
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  // Submit form
  const handleSubmit = (e) => {
    e.preventDefault();

    // Generate unique employee ID
    const nextId = employees.reduce((max, employee) => {
      const number = Number(employee.id.replace("EMP", ""));
      return Math.max(max, number);
    }, 0) + 1;

    const newEmployee = {
      id: `EMP${String(nextId).padStart(3, "0")}`,
      ...formData,
      salary: Number(formData.salary)
    };

    // Add employee to main state
    onAddEmployee(newEmployee);

    alert("Employee added successfully!");

    // Navigate to employee list
    navigate("/employees");
  };

  return (
    <div className="add-employee-page">

      {/* Header */}
      <div className="page-header">
        <div>
          <h1>Add Employee</h1>
          <p>Register a new employee in your organisation</p>
        </div>
      </div>

      {/* Employee Form */}
      <form className="employee-form" onSubmit={handleSubmit}>

        <div className="form-group">
          <label>Full Name</label>
          <input
            type="text"
            name="name"
            placeholder="Enter employee name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Email Address</label>
          <input
            type="email"
            name="email"
            placeholder="Enter email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Phone Number</label>
          <input
            type="tel"
            name="phone"
            placeholder="Enter phone number"
            pattern="[0-9]{10}"
            title="Enter a valid 10-digit phone number"
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
            type="text"
            name="designation"
            placeholder="Enter designation"
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
            required
          />
        </div>

        <div className="form-group">
          <label>Monthly Salary (₹)</label>
          <input
            type="number"
            name="salary"
            placeholder="Enter salary"
            min="1"
            value={formData.salary}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Employee Status</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>

        {/* Buttons */}
        <div className="form-actions">

          <button type="submit" className="save-button">
            Add Employee
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

export default AddEmployee;