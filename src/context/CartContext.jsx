import React, { createContext, useEffect, useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("primecore_cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem("primecore_cart", JSON.stringify(cart));
  }, [cart]);

  const getProductKey = (product) => {
    return product?.product_id || product?.id || product?._id;
  };

  const addToCart = (product) => {
    const key = getProductKey(product);

    if (!key) {
      alert("Product has no ID");
      return;
    }

    setCart((prev) => {
      const exists = prev.find((item) => getProductKey(item) === key);

      if (exists) {
        return prev.map((item) =>
          getProductKey(item) === key
            ? { ...item, quantity: (item.quantity || 1) + 1 }
            : item
        );
      }

      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (product) => {
    const key = getProductKey(product);

    setCart((prev) =>
      prev.filter((item) => getProductKey(item) !== key)
    );
  };

  const increaseQty = (product) => {
    const key = getProductKey(product);

    setCart((prev) =>
      prev.map((item) =>
        getProductKey(item) === key
          ? { ...item, quantity: (item.quantity || 1) + 1 }
          : item
      )
    );
  };

  const decreaseQty = (product) => {
    const key = getProductKey(product);

    setCart((prev) =>
      prev.map((item) =>
        getProductKey(item) === key
          ? {
              ...item,
              quantity: Math.max((item.quantity || 1) - 1, 1),
            }
          : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem("primecore_cart");
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        increaseQty,
        decreaseQty,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};