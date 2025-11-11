import { createContext, useContext, useEffect, useState } from "react";

const FormOfOrderContext = createContext();

export const useOrderForm = () => {
  return useContext(FormOfOrderContext);
};

export const FormOfOrderProvider = ({ children }) => {
  const [userOrderInfo, setUserOrderInfo] = useState([]);
  const [totalPriceOfOrder, setTotalPriceOfOrder] = useState();
  const [cartItemsOfOrder, setCartItemsOfOrder] = useState();

  const orderInfoHandler = (v, t, c) => {
    setTotalPriceOfOrder(t);
    setCartItemsOfOrder(c);
    setUserOrderInfo(v);
  };

  const orderFull = {
    totalPrice: totalPriceOfOrder,
    cartItems: cartItemsOfOrder,
    user: userOrderInfo,
  };

  useEffect(() => {
    localStorage.setItem("orderFull", orderFull);
  }, []);

  const value = {
    orderInfoHandler,
    userOrderInfo,
  };
  return (
    <FormOfOrderContext.Provider value={value}>
      {children}
    </FormOfOrderContext.Provider>
  );
};
