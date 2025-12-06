import { createContext, useContext, useEffect, useState } from "react";

const FormOfOrderContext = createContext();

export const useOrderForm = () => {
  return useContext(FormOfOrderContext);
};

export const FormOfOrderProvider = ({ children }) => {
  const [userOrderInfo, setUserOrderInfo] = useState([]);
  const [totalPriceOfOrder, setTotalPriceOfOrder] = useState();
  const [cartItemsOfOrder, setCartItemsOfOrder] = useState();
  const [ordersHistory, setOrdersHistory] = useState([]);

  useEffect(() => {
    const savedOrders = localStorage.getItem("ordersHistory");
    if (savedOrders) {
      try {
        setOrdersHistory(JSON.parse(savedOrders));
      } catch (e) {
        console.warn("Orders History was lost", e);
      }
    }
  }, []);

  const orderInfoHandler = (v, t, c) => {
    setTotalPriceOfOrder(t);
    setCartItemsOfOrder(c);
    setUserOrderInfo(v);

    const newOrder = {
      id: Date.now(),
      date: new Date().toISOString(),
      totalPrice: t,
      cartItems: c,
      user: v,
    };

    const updatedHistory = [...ordersHistory, newOrder];
    setOrdersHistory(updatedHistory);

    localStorage.setItem("ordersHistory", JSON.stringify(updatedHistory));
  };

  useEffect(() => {
    const orderFull = {
      totalPrice: totalPriceOfOrder,
      cartItems: cartItemsOfOrder,
      user: userOrderInfo,
    };

    localStorage.setItem("orderFull", JSON.stringify(orderFull));
  }, [userOrderInfo, totalPriceOfOrder, cartItemsOfOrder]);

  const getOrdersHistory = () => {
    return ordersHistory;
  };

  const value = {
    orderInfoHandler,
    userOrderInfo,
    getOrdersHistory,
  };
  return (
    <FormOfOrderContext.Provider value={value}>
      {children}
    </FormOfOrderContext.Provider>
  );
};
