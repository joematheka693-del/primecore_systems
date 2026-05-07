import React, { createContext, useEffect, useState } from "react";

// createContext() creates a React context that allows data to be shared globally between components without prop drilling.
export const CartContext = createContext();

// This creates a provider component.
// children means: Whatever components are placed inside CartProvider.
// children represents all components wrapped inside the provider.

export const CartProvider = ({ children }) => {
  // This creates cart state.(stores the current cart items.)
  // setCart updates the cart. 
  // The function inside useState is called the initial state function.
  // It runs once when the component first loads.

  const [cart, setCart] = useState(() => {
    // This checks browser storage for saved cart data.
    // localStorage stores data in the browser even after refresh.
    // I used localStorage to persist cart data even when the user refreshes or closes the browser.
    const savedCart = localStorage.getItem("primecore_cart");

    // If saved cart exists, convert it from JSON string back to JavaScript array.
    // If not, start with an empty cart.
    // We use JSON.parse to convert the string back to an array of cart items when loading from localStorage. When saving to localStorage, we convert the cart array into a JSON string using JSON.stringify.
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // This code below runs every time cart changes.
  // It saves the latest cart into localStorage as a JSON string. This way, the cart data persists across page reloads and browser sessions.
  useEffect(() => {
    // localStorage only stores strings.
    // Used when saving the cart to localStorage, we convert the cart array into a JSON string.
    localStorage.setItem("primecore_cart", JSON.stringify(cart));
  }, [cart]); // The dependency array [cart] means this effect runs whenever the cart state changes.


  // This function gets the product ID.
    const getProductKey = (product) => {
    return product?.product_id || product?.id || product?._id; // This checks for different possible ID fields in the product object. It returns the first one it finds, or undefined if none exist.
  };
  // The ?. is called optional chaining.
  // Optional chaining safely accesses a property without crashing if the object is null or undefined.

  const addToCart = (product) => { // This function adds a product to cart. It receives one product as input.
    const key = getProductKey(product); // This gets the product’s unique ID.


    // If the product has no ID, we can’t add it to the cart. So we show an alert and exit the function.
    // This is a safety check to prevent adding products without IDs, which could cause issues when managing the cart.
    if (!key) {
      alert("Product has no ID");
      return;
    }


    // This updates cart using the previous state.
    // prev means the previous cart value.
    // This is better than using cart directly when the new state depends on the old state.
    // Why use prev? Because state updates can be asynchronous, so using the previous state ensures the update is based on the latest cart data.
    setCart((prev) => {

      // This checks if the product is already in the cart by comparing its key with existing items.
      // find() returns the matching item if found. If not found, it returns undefined.
      const exists = prev.find((item) => getProductKey(item) === key);

      if (exists) {  // If item is already in cart, do not add duplicate. Instead, we increase its quantity by 1.
        return prev.map((item) =>  // We use map to create a new array where we update the quantity of the existing item.
          getProductKey(item) === key  // If this is the item we want to update.

          // If this is the matching item, increase its quantity.
          // Otherwise, keep the item unchanged.
            ? { ...item, quantity: (item.quantity || 1) + 1 } // This copies the existing item. If quantity is not defined, it defaults to 1 before adding 1.
            : item
        );
      }

      return [...prev, { ...product, quantity: 1 }];  // If the product is not in the cart, we add it as a new item with quantity 1. We create a new array that includes all previous items plus the new product.
      // Keep all previous cart items.
      // Add the new product.
      // Set quantity to 1.
    });
  };

  const removeFromCart = (product) => {  // This function removes a product from the cart.
    const key = getProductKey(product);  // Get the product’s unique ID.

    setCart((prev) =>
      // filter() creates a new array containing only items that pass a condition
    // Keep every item whose ID is not equal to the removed product ID.
      prev.filter((item) => getProductKey(item) !== key)  
    );
  };

  const increaseQty = (product) => {  // This increases quantity of a product already in cart.
    const key = getProductKey(product);

    setCart((prev) =>
      // We use map to create a new array where we update the quantity of the matching item.
    // If this is the item we want to update, increase its quantity. Otherwise, keep it unchanged.
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
              quantity: Math.max((item.quantity || 1) - 1, 1),  // It prevents quantity going below 1.
              // Math.max() returns the largest of the given numbers. Here, it ensures that the quantity never goes below 1.
            }
          : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
    // This clears the cart by setting it to an empty array. It also removes the cart data from localStorage to ensure that the cart is completely reset.
    // Because if I only clear state, the old cart might return after refresh from localStorage.
    localStorage.removeItem("primecore_cart");
  };

  return (
    // This provides the cart state and functions to all components wrapped inside CartProvider. Any component that consumes this context can access the cart data and these functions to manage the cart.
    <CartContext.Provider
      value={{
        // This is the data and functions being shared globally.
        // Any component that uses this context can access the current cart and these functions to add, remove, increase, decrease, or clear the cart.
        cart,
        addToCart,
        removeFromCart,
        increaseQty,
        decreaseQty,
        clearCart,
      }}
    >
      {children}
      {/* Ends the provider. */}
    </CartContext.Provider>
  );
};