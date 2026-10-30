import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AddEmployee ({onAddEmployee}){
  const navigate =  useNavigate();

  const [formData, setFormData] = useState({
    id :"",
    name:  "",
    email:"",
    phone: "",
    department: "",
    designation :"",
    joiningDate: "",
    salary : "",
    status :"Active",
  });

const handleChange =(e) => {
  const {name, value} = e.target;

  setFormData({
    ...formData,
  [name] : value
  });
};



const handleSubmit=(e) =>{
  e.preventDefault();

  onAddEmployee({
    ...formData,
    salary : Number(formData.salary)
  });

  alert("Employee added successfully!");

  navigate("/Employees");
};

return (
  <div className="add-employee-page">

  <h1>Add new Employees</h1>
  <p>Enter employee information below.</p>

  <form onSubmit={handleSubmit}>

  <label>Employee ID</label>
  <input
    name = "id"
    value={formData.id}
    onChange={handleChange}
    placeholder="EMP005"
    required
  />

  <label>Full Name</label>
  <input
    name = "name"
    value={formData.name}
    onChange={handleChange}
    placeholder="Enter full name"
    required
  />

  <label>Email Address</label>
  <input
    type="email"
    name="email"
    value={formData.email}
    onChange={handleChange}
    placeholder="Enter your email ID"
    required
  />

  <label>Phone Number</label>
  <input
    type="tel"
    name="phone"
    value={formData.phone}
    onChange={handleChange}
    placeholder="10 digit phone number"
    pattern="[0-9]{10}"
    required
  />

  <label>Department</label>
  <select
    name="department"
    value={formData.department}
    onChange={handleChange}
    required
  >
    <option value="">Select Department</option>
    <option value="IT">IT</option>
    <option value="HR">HR</option>
    <option value="Finance">Finance</option>
    <option value="Marketing">Marketing</option>
    <option value="Sales">Sales</option>
  </select>

  <label>Designation</label>
  <input
    name="designation"
    value={formData.designation}
    onChange={handleChange}
    placeholder="Frontend Developer"
    required
  />


  <label>Joining Date</label>
        <input
          type="date"
          name="joiningDate"
          value={formData.joiningDate}
          onChange={handleChange}
          required
        />

        <label>Monthly Salary</label>
        <input
          type="number"
          name="salary"
          value={formData.salary}
          onChange={handleChange}
          placeholder="30000"
          min="1"
          required
        />

        <label>Status</label>
        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
        >
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>

        <div className="form-buttons">

          <button type="submit">
            Save Employee
          </button>

          <button
            type="button"
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


