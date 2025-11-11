import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [loginType, setLoginType] = useState(false);
  const user = {
    email: "admin@gmail.com",
    img: "/user.svg",
  };

  const loginHandler = (userEmail) => {
    if (userEmail === user.email) {
      setLoginType(true);
    }
  };
  useEffect(() => {
    localStorage.setItem("loginType", loginType);
  }, [loginType]);

  const loginTypeFromLS = localStorage.getItem("loginType");

  const value = {
    user,
    loginHandler,
    loginType,
    loginTypeFromLS,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
