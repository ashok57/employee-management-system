function EmployeeTable({ employees, onEdit, onDelete }) {

  return (
    <div className="employee-table-container">

      <table className="employee-table">

        {/* Table Header */}
        <thead>
          <tr>
            <th>Employee ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Department</th>
            <th>Designation</th>
            <th>Salary</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        {/* Table Body */}
        <tbody>

          {employees.length > 0 ? (

            employees.map((employee) => (

              <tr key={employee.id}>

                <td>{employee.id}</td>

                <td>{employee.name}</td>

                <td>{employee.email}</td>

                <td>{employee.department}</td>

                <td>{employee.designation}</td>

                <td>
                  ₹{Number(employee.salary).toLocaleString("en-IN")}
                </td>

                <td>
                  <span
                    className={
                      employee.status === "Active"
                        ? "status-active"
                        : "status-inactive"
                    }
                  >
                    {employee.status}
                  </span>
                </td>

                <td className="action-buttons">

                  <button
                    className="edit-button"
                    onClick={() => onEdit(employee)}
                  >
                    Edit
                  </button>

                  <button
                    className="delete-button"
                    onClick={() => onDelete(employee.id)}
                  >
                    Delete
                  </button>

                </td>

              </tr>

            ))

          ) : (

            <tr>
              <td colSpan="8" className="no-data">
                No employees found.
              </td>
            </tr>

          )}

        </tbody>

      </table>

    </div>
  );
}

export default EmployeeTable;
