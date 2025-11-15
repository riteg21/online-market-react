import { createContext, useContext, useState } from "react";

const PayContext = createContext();

export function usePay() {
  const context = useContext(PayContext);
  if (!context) {
    throw new Error("usePay must be used within a PayProvider");
  }
  return context;
}

export const PayProvider = ({ children }) => {
  const [payType, setPayType] = useState(false);

  const value = {
    payType,
    setPayType,
  };

  return <PayContext.Provider value={value}>{children}</PayContext.Provider>;
};
