import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AddEmployee({ onAddEmployee, employees }) {
  const navigate = useNavigate();

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

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  // Generate next employee ID
  const generateEmployeeId = () => {
    const maxId = employees.reduce((max, employee) => {
      const currentId = Number(
        (employee.employeeId || "").replace("EMP", "")
      );

      return Math.max(max, currentId || 0);
    }, 0);

    return `EMP${String(maxId + 1).padStart(3, "0")}`;
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    setSaving(true);
    setError("");

    const newEmployee = {
      employeeId: generateEmployeeId(),
      ...formData,
      salary: Number(formData.salary)
    };

    try {
      await onAddEmployee(newEmployee);

      alert("Employee added successfully!");

      navigate("/employees");
    } catch (err) {
      console.error("Add employee error:", err);

      setError(
        err.response?.data?.message ||
        "Unable to add employee. Please try again."
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="add-employee-page">

      <div className="page-header">
        <div>
          <h1>Add Employee</h1>
          <p>Register a new employee in your organisation</p>
        </div>
      </div>

      <form className="employee-form" onSubmit={handleSubmit}>

        {error && (
          <p style={{ color: "red" }}>{error}</p>
        )}

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

        <div className="form-actions">

          <button
            type="submit"
            className="save-button"
            disabled={saving}
          >
            {saving ? "Saving..." : "Add Employee"}
          </button>

          <button
            type="button"
            className="cancel-button"
            onClick={() => navigate("/employees")}
            disabled={saving}
          >
            Cancel
          </button>

        </div>
      </form>
    </div>
  );
}

export default AddEmployee;
