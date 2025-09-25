import { createContext, useContext, useState } from "react";

const TotalPriceContext = createContext();

export function TotalPriceProvider({ children }) {
  const [totalPrice, setTotalPrice] = useState(0);

  const addToTotal = (price, product) => {
    setTotalPrice((prev) => prev + price);
  };

  const updateTotal = (oldTotal, newTotal) => {
    setTotalPrice((prev) => prev - oldTotal + newTotal);
  };
  const removeFromTotal = (price) => {
    setTotalPrice((prev) => prev - price);
  };

  return (
    <TotalPriceContext.Provider
      value={{
        totalPrice,
        addToTotal,
        updateTotal,
        removeFromTotal,
      }}
    >
      {children}
    </TotalPriceContext.Provider>
  );
}
export function useTotalPrice() {
  const context = useContext(TotalPriceContext);
  if (!context) {
    throw new Error("useTotalPrice must be used within a TotalPriceProvider");
  }
  return context;
}
