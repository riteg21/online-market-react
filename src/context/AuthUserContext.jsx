import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [loginType, setLoginType] = useState(false);
  const user = {
    email: "admin@gmail.com",
    img: "/user-default.svg",
  };

  const loginHandler = (userEmail) => {
    if (userEmail === user.email) {
      setLoginType(true);
    }
  };
  const value = {
    user,
    loginHandler,
    loginType,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
