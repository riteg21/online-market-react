import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [loginType, setLoginType] = useState(() => {
    try {
      const storageLoginType = localStorage.getItem("loginType");
      return storageLoginType ? JSON.parse(storageLoginType) : false;
    } catch (e) {
      console.warn("Failed to parse loginType from localStorage:", e);
      return false;
    }
  });

  const user = {
    email: "admin@gmail.com",
    img: "/user.svg",
  };

  useEffect(() => {
    localStorage.setItem("loginType", JSON.stringify(loginType));
  }, [loginType]);

  const loginHandler = (userEmail) => {
    if (userEmail === user.email) {
      setLoginType(true);
      return { success: true };
    }
    return { success: false, error: "Неверный email" };
  };

  const value = {
    user,
    loginHandler,
    loginType,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
