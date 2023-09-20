import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isProfileUpdated, setIsProfileUpdated] = useState(false);
  const [loading, setLoading] = useState(true);

  const login = async (userCredentials) => {
    try {
      const response = await axios.post(
        import.meta.env.VITE_API_ENDPOINT + "/api/auth/login",
        userCredentials,
        { withCredentials: true }
      );
      console.log(response.data);
      setCurrentUser(response.data);
      setIsAuthenticated(true);
      toast.success("Login Successful!");
    } catch (error) {
      console.log("Login failed", error.message);
      setIsAuthenticated(false);
      toast.error("Invalid Username or Password");
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          import.meta.env.VITE_API_ENDPOINT + "/api/auth/refetch",
          { withCredentials: true }
        );
        setCurrentUser(response.data);
        console.log(response.data);
      } catch (error) {
        console.log("Error occurred while fetching data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        loading,
        login,
        isAuthenticated,
        isProfileUpdated,
        setIsProfileUpdated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
