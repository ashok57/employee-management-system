
function EmployeeTable({ employees = [], onEdit, onDelete }) {
  return (
    <div className="employee-table-container">

      <table className="employee-table">

        <thead>
          <tr>
            <th>Employee ID</th>
            <th>Employee</th>
            <th>Email</th>
            <th>Department</th>
            <th>Designation</th>
            <th>Salary</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {employees.length > 0 ? (
            employees.map((employee) => {
              const id = employee.id || employee._id;

              return (
                <tr key={id}>

                  <td>
                    <strong className="employee-id">
                      {employee.employeeId || "N/A"}
                    </strong>
                  </td>

                  <td>
                    <div className="employee-name-cell">
                      <div className="employee-avatar">
                        {(employee.name || "?")
                          .charAt(0)
                          .toUpperCase()}
                      </div>

                      <strong>{employee.name || "N/A"}</strong>
                    </div>
                  </td>

                  <td>{employee.email || "N/A"}</td>

                  <td>{employee.department || "N/A"}</td>

                  <td>{employee.designation || "N/A"}</td>

                  <td className="salary-cell">
                    ₹{Number(employee.salary || 0).toLocaleString("en-IN")}
                  </td>

                  <td>
                    <span
                      className={`employee-status ${
                        employee.status === "Active"
                          ? "status-active"
                          : "status-inactive"
                      }`}
                    >
                      {employee.status || "Unknown"}
                    </span>
                  </td>

                  <td>
                    <div className="action-buttons">

                      <button
                        className="edit-button"
                        onClick={() => onEdit(employee)}
                      >
                        Edit
                      </button>

                      <button
                        className="delete-button"
                        onClick={() => onDelete(id)}
                      >
                        Delete
                      </button>

                    </div>
                  </td>

                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan="8" className="no-data">
                No employees found. Try changing your search or filters.
              </td>
            </tr>
          )}
        </tbody>

      </table>

    </div>
  );
}

export default EmployeeTable;
