import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Building2,
  Settings,
  LogOut,
  UserCircle,
} from "lucide-react";


import {useAuth} from "../context/AuthContext";


function Sidebar() {

  const {user, logout} = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login", {replace: true});
  };

  return (
    <div className="sidebar">

      <h2>EMS Portal</h2>

    <div className="sidebar-user">
      <UserCircle size = {35}/>
      <div>
         <h4>{user?.name || "User"}</h4>

         <span>
          {user?.role === "admin" ? "Administrator" : "Employee"}
         </span>
      </div>
    </div>

      <nav>
        <NavLink to="/">
          <LayoutDashboard />
          Dashboard
        </NavLink>

        {user?.role === "admin" && (
          <>
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
    </>
  )}

</nav>

      <button className="logout"
      onClick={handleLogout}>
        <LogOut />
        Logout
      </button>

    </div>
  );
}

export default Sidebar;