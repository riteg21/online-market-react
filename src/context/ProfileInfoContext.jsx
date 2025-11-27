import { createContext, useContext, useState, useEffect } from "react";

const ProfileInfoContext = createContext();

export function useProfileInfo() {
  const context = useContext(ProfileInfoContext);
  if (!context) {
    throw new Error("useProfileInfo must be used within a ProfileProvider");
  }
  return context;
}

export const ProfileInfoProvider = ({ children }) => {
  const [userPersonalInfo, setUserPersonalInfo] = useState([]);

  const userInfoHandler = (data) => {
    setUserPersonalInfo(data);
  };

  useEffect(() => {
    localStorage.setItem("userInfo", JSON.stringify(userPersonalInfo));
  }, [userPersonalInfo]);

  const value = {
    userInfoHandler,
  };

  return (
    <ProfileInfoContext.Provider value={value}>
      {children}
    </ProfileInfoContext.Provider>
  );
};
