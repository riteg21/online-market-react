import { createContext, useContext, useState } from "react";

const TotalPriceContext = createContext();

export function TotalPriceProvider({ children }) {
  const [totalPrice, setTotalPrice] = useState(0);
  const [cartItems, setCartItems] = useState([]);

  const addToTotal = (price, product) => {
    setTotalPrice((prev) => prev + price);

    setCartItems((prevItems) => {
      //prevItems - это типа текущий товар
      const existingItemIndex = prevItems.findIndex(
        (item) => item.id === product.id
      );

      if (existingItemIndex >= 0) {
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex], //обращение к найденому товару в копии массива - новый массив updatedItems сделал чтобы не мутировать главый
          quantity: updatedItems[existingItemIndex].quantity + 1,
        };
        return updatedItems;
      } else {
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
  };

  const updateTotal = (oldTotal, newTotal, product, newQuantity) => {
    setTotalPrice((prev) => prev - oldTotal + newTotal);

    setCartItems((prevItems) => {
      const existingItemIndex = prevItems.findIndex(
        (item) => item.id === product.id
      );

      if (existingItemIndex >= 0) {
        const updatedItems = [...prevItems];
        if (newQuantity > 0) {
          updatedItems[existingItemIndex] = {
            ...updatedItems[existingItemIndex],
            quantity: newQuantity,
          };
        } else {
          updatedItems.splice(existingItemIndex, 1);
        }
        return updatedItems;
      }
      return prevItems;
    });
  };

  const removeFromTotal = (price, product) => {
    setTotalPrice((prev) => prev - price);
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.id !== product.id)
    );
  };

  const clearCart = () => {
    setTotalPrice(0);
    setCartItems([]);
  };

  const removeItemFromCart = (productId) => {
    const itemToRemove = cartItems.find((item) => item.id === productId);
    if (itemToRemove) {
      setTotalPrice(
        (prev) => prev - itemToRemove.price * itemToRemove.quantity
      );
      setCartItems((prev) => prev.filter((item) => item.id !== productId));
    }
  };

  return (
    <TotalPriceContext.Provider
      value={{
        totalPrice,
        cartItems,
        addToTotal,
        updateTotal,
        removeFromTotal,
        clearCart,
        removeItemFromCart,
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
