import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Building2,
  Settings,
  LogOut
} from "lucide-react";

function Sidebar() {
  return (
    <div className="sidebar">

      <h2>EMS Portal</h2>

      <nav>
        <NavLink to="/">
          <LayoutDashboard />
          Dashboard
        </NavLink>

        <NavLink to="/employees">
          <Users />
          Employees
        </NavLink>

        <NavLink to="/departments">
          <Building2 />
          Departments
        </NavLink>

        <NavLink to="/settings">
          <Settings />
          Settings
        </NavLink>
      </nav>

      <button className="logout">
        <LogOut />
        Logout
      </button>

    </div>
  );
}

export default Sidebar;