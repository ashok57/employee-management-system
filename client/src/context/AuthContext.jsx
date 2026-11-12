
import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import {
  loginUser,
  getLoggedInUser,
} from "../services/authService";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const [token, setToken] = useState(
    () => localStorage.getItem("token")
  );

  const [authLoading, setAuthLoading] = useState(true);

  // Verify existing login session
  useEffect(() => {
    const verifySession = async () => {
      if (!token) {
        setAuthLoading(false);
        return;
      }

      try {
        const response = await getLoggedInUser(token);

        setUser(response.data.user);
      } catch (error) {
        console.error("Session verification failed:", error);

        localStorage.removeItem("token");
        setToken(null);
        setUser(null);
      } finally {
        setAuthLoading(false);
      }
    };

    verifySession();
  }, [token]);

  // Login function
  const login = async (email, password) => {
    const response = await loginUser({
      email,
      password,
    });

    const {
      token: receivedToken,
      user: loggedInUser,
    } = response.data;

    localStorage.setItem("token", receivedToken);

    setToken(receivedToken);
    setUser(loggedInUser);

    return loggedInUser;
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem("token");

    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        authLoading,
        isAuthenticated: Boolean(user && token),
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom authentication hook
export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used inside AuthProvider"
    );
  }

  return context;
};
