import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import  './login.css';


function Login() {
  const {login}  = useAuth();

  const navigate = useNavigate();
  const location = useLocation();


  const[email, setEmail] = useState("");
  const[password, setPassword] =  useState("");
  const [error, setError] = useState("");
  const[loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);


    try{
      await login(email, password);

      const redirectPath = location.state?.from?.pathname || "/";

      navigate(redirectPath, {replace : true});
    }
    catch (err) {
      setError (
        err.response?.data?.message ||
        "Login failed. Please check your credentials."
      );
    } 
    finally {
      setLoading(false);
    }
  };

  return (
    <div className = "login-container">
      <div className="login-card">

        <div className="login-header">
          <h1>EMS Portal</h1>
          <p>Employee Management System</p>
        </div>


        <form onSubmit={handleSubmit}>

          <div className="login-input-group">
            <label>Email Address</label>
            <input
            type="email"
            autoComplete="username"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            />
          </div>

          <div className="login-input-group">
            <label>Password</label>
            <input
            type="password"
            autoComplete="current-password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            />
          </div>
          <button
          type="submit"
          className="login-button"
          disabled={loading}
          >
            {loading ? "Logging in ..." : "Login"}
            </button>
        </form>
          <p className="login-footer">
            Secure Employee Management Portal
          </p>
    </div>
  </div>
  );
}


export default Login;