
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

function Dashboard({ employees = [] }) {
  const navigate = useNavigate();

  const totalEmployees = employees.length;

  const activeEmployees = employees.filter(
    (e) => e.status === "Active"
  ).length;

  const inactiveEmployees = employees.filter(
    (e) => e.status === "Inactive"
  ).length;

  const itEmployees = employees.filter(
    (e) => e.department === "IT"
  ).length;

  // Department-wise employee count
  const departmentData = useMemo(() => {
    const counts = {};

    employees.forEach((employee) => {
      const department = employee.department || "Other";
      counts[department] = (counts[department] || 0) + 1;
    });

    return Object.entries(counts)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count);
  }, [employees]);

  const recentEmployees = [...employees].reverse().slice(0, 5);

  const activePercentage = totalEmployees
    ? Math.round((activeEmployees / totalEmployees) * 100)
    : 0;

  return (
    <div className="dashboard">

      {/* HEADER */}
      <div className="dashboard-header">
        <div>
          <h1>Dashboard</h1>
          <p>Welcome back! Here's your employee overview.</p>
        </div>

        <button
          className="dashboard-add-button"
          onClick={() => navigate("/add-employee")}
        >
          + Add Employee
        </button>
      </div>

      {/* STATISTICS */}
      <div className="dashboard-cards">

        <div className="dashboard-card total-card">
          <div className="card-icon">👥</div>
          <p>Total Employees</p>
          <h2>{totalEmployees}</h2>
          <span>Employees registered</span>
        </div>

        <div className="dashboard-card active-card">
          <div className="card-icon">✓</div>
          <p>Active Employees</p>
          <h2>{activeEmployees}</h2>
          <span>Currently active</span>
        </div>

        <div className="dashboard-card inactive-card">
          <div className="card-icon">⏸</div>
          <p>Inactive Employees</p>
          <h2>{inactiveEmployees}</h2>
          <span>Currently inactive</span>
        </div>

        <div className="dashboard-card it-card">
          <div className="card-icon">💻</div>
          <p>IT Department</p>
          <h2>{itEmployees}</h2>
          <span>IT team members</span>
        </div>

      </div>

      {/* CHARTS */}
      <div className="dashboard-analytics">

        {/* DEPARTMENT CHART */}
        <div className="dashboard-section chart-section">
          <h2>Department Overview</h2>
          <p>Employee distribution across departments</p>

          {departmentData.length > 0 ? (
            <div className="department-chart">
              {departmentData.map((item) => {
                const percentage = totalEmployees
                  ? (item.count / totalEmployees) * 100
                  : 0;

                return (
                  <div className="department-item" key={item.name}>
                    <div className="department-label">
                      <strong>{item.name}</strong>
                      <span>{item.count} employees</span>
                    </div>

                    <div className="chart-track">
                      <div
                        className="chart-fill"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="empty-message">No department data available.</p>
          )}
        </div>

        {/* EMPLOYEE STATUS */}
        <div className="dashboard-section chart-section">
          <h2>Employee Status</h2>
          <p>Active and inactive employee distribution</p>

          <div className="status-summary">
            <div className="status-number">
              <h2>{activePercentage}%</h2>
              <span>Active employees</span>
            </div>

            <div className="status-progress">
              <div
                className="status-progress-active"
                style={{ width: `${activePercentage}%` }}
              />
            </div>

            <div className="status-legend">
              <span>
                <i className="legend-active" />
                Active: {activeEmployees}
              </span>

              <span>
                <i className="legend-inactive" />
                Inactive: {inactiveEmployees}
              </span>
            </div>
          </div>
        </div>

      </div>

      {/* RECENT EMPLOYEES */}
      <div className="dashboard-section recent-section">

        <div className="section-header">
          <div>
            <h2>Recent Employees</h2>
            <p>Latest employees in your organization</p>
          </div>

          <button
            className="view-all-button"
            onClick={() => navigate("/employees")}
          >
            View All
          </button>
        </div>

        {recentEmployees.length > 0 ? (
          <div className="recent-employee-list">

            {recentEmployees.map((employee) => (
              <div
                className="recent-employee"
                key={employee.id || employee._id}
              >
                <div className="employee-avatar">
                  {employee.name?.charAt(0).toUpperCase()}
                </div>

                <div className="employee-info">
                  <h4>{employee.name}</h4>
                  <p>
                    {employee.employeeId} · {employee.designation}
                  </p>
                </div>

                <span
                  className={`employee-status ${
                    employee.status === "Active"
                      ? "status-active"
                      : "status-inactive"
                  }`}
                >
                  {employee.status}
                </span>
              </div>
            ))}

          </div>
        ) : (
          <p className="empty-message">
            No employees added yet.
          </p>
        )}

      </div>

    </div>
  );
}

export default Dashboard;
