// src/context/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  console.log("authProvider içindeyim");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const checkAuth = async () => {
    const access_token = window.localStorage.getItem("access token");
    console.log("access_token in the authContext:", access_token);

    if (!access_token) {
      console.log("access token yok, setUser(null)");
      return setUser(null);
    }

    try {
      const res = await axios.post("http://localhost:4000/api/verify", {
        token: access_token,
      });
      console.log("res.data in the authContext:", res.data);
      setUser(res.data.user);
    } catch (err) {
      console.log("Token geçersiz ya da başka hata oldu:", err);
      setUser(null);
      localStorage.removeItem("access token"); // optional: temizlik
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
