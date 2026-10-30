
function Dashboard({ employees = [] }) {

  // Calculate employee statistics
  const totalEmployees = employees.length;

  const activeEmployees = employees.filter(
    (employee) => employee.status === "Active"
  ).length;

  const inactiveEmployees = employees.filter(
    (employee) => employee.status === "Inactive"
  ).length;

  const itEmployees = employees.filter(
    (employee) => employee.department === "IT"
  ).length;

  // Get the latest five employees
  const recentEmployees = [...employees].reverse().slice(0, 5);

  return (
    <div className="dashboard">

      {/* Dashboard Header */}
      <div className="dashboard-header">
        <h1>Dashboard</h1>
        <p>Welcome to your Employee Management System</p>
      </div>

      {/* Statistics Cards */}
      <div className="dashboard-cards">

        <div className="dashboard-card">
          <h3>Total Employees</h3>
          <h1>{totalEmployees}</h1>
        </div>

        <div className="dashboard-card">
          <h3>Active Employees</h3>
          <h1>{activeEmployees}</h1>
        </div>

        <div className="dashboard-card">
          <h3>Inactive Employees</h3>
          <h1>{inactiveEmployees}</h1>
        </div>

        <div className="dashboard-card">
          <h3>IT Department</h3>
          <h1>{itEmployees}</h1>
        </div>

      </div>

      {/* Recent Employees */}
      <div className="dashboard-section">
        <h2>Recent Employees</h2>

        {recentEmployees.length > 0 ? (
          recentEmployees.map((employee) => (
            <div className="recent-employee" key={employee.id}>

              <div>
                <h4>{employee.name}</h4>
                <p>{employee.designation}</p>
              </div>

              <span
                className={
                  employee.status === "Active" ? "active" : "inactive"
                }
              >
                {employee.status}
              </span>

            </div>
          ))
        ) : (
          <p>No employees added yet.</p>
        )}

      </div>

    </div>
  );
}

export default Dashboard;
