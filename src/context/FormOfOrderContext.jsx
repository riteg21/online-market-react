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

  useEffect(() => {
    const orderFull = {
      totalPrice: totalPriceOfOrder,
      cartItems: cartItemsOfOrder,
      user: userOrderInfo,
    };

    localStorage.setItem("orderFull", JSON.stringify(orderFull));
  }, [userOrderInfo, totalPriceOfOrder, cartItemsOfOrder]);

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
