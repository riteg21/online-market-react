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
  const [userPersonalInfo, setUserPersonalInfo] = useState({});
  const [showProfileInfo, setShowProfileInfo] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const storageUserInfo = localStorage.getItem("userInfo");
      const storageShowProfileInfo = localStorage.getItem("showProfileInfo");

      if (storageUserInfo) {
        setUserPersonalInfo(JSON.parse(storageUserInfo));
      }

      if (storageShowProfileInfo) {
        const parsedValue = JSON.parse(storageShowProfileInfo);
        setShowProfileInfo(parsedValue);
      }
    } catch (e) {
      console.error("Failed to parse data from localStorage:", e);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (isLoaded && Object.keys(userPersonalInfo).length > 0) {
      localStorage.setItem("userInfo", JSON.stringify(userPersonalInfo));
    }
  }, [userPersonalInfo, isLoaded]);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("showProfileInfo", JSON.stringify(showProfileInfo));
    }
  }, [showProfileInfo, isLoaded]);

  const userInfoHandler = (data, bool) => {
    setUserPersonalInfo(data);
    setShowProfileInfo(bool);
  };

  const value = {
    userInfoHandler,
    userPersonalInfo,
    showProfileInfo,
  };

  return (
    <ProfileInfoContext.Provider value={value}>
      {children}
    </ProfileInfoContext.Provider>
  );
};
