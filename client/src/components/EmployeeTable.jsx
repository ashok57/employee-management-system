function EmployeeTable({Employees, onEdit, onDelete}){
  return(
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>Employee ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Department</th>
            <th>Designation</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>


        <tbody>

          {Employees.map((Employee)=>{

            <tr key={employee.id}>

              <td>{employee.id}</td>
              <td>{employee.name}</td>
              <td>{employee.email}</td>
              <td>{employee.department}</td>
              <td>{employee.designation}</td>

              <td>
                <span className="`status {employee.status.toLowerCase()}`">
                {employee.status}
                </span>
              </td> 

              <td>
                <button onClick={() => onEdit(employee)}>
                  Edit
                </button>

                <button onClick={() => onDelete(employee.id)}>
                  Delete
                </button>
              </td>
            </tr>

          })}

        </tbody>

      </table>

    </div>
  );
}

export default EmployeeTable;