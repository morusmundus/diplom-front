import React, {createContext, useState, useContext, useEffect, useMemo} from "react";
import {toast} from "react-toastify";

// Create a context
const CartContext = createContext();

// Create a provider component that will wrap your entire application
const CartProvider = ({children}) => {
  const [cartItems, setCartItems] = useState([]);

  useMemo(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (item) => {
    console.log(item)
    const newItem = {
      id: item.id,
      title: item.title,
      authors: item.authors,
      genres: item.genres,
      availableCopies: item.availableCopies,
      published: item.published,
      quantity: 1,
    };

    if (cartItems.find(i => i.id === item.id)) {
      incQuantity(item.id)
    } else {
      setCartItems([...cartItems, newItem]);
    }
  };

  const incQuantity = (id) => {
    const duplItem = cartItems.find(i => i.id === id)
    if (duplItem.availableCopies > duplItem.quantity) {
      duplItem.quantity = duplItem.quantity + 1
    } else {
      toast("Достигнуто максимальное количество.")
    }
    setCartItems([...cartItems]);
  }

  const decQuantity = (id) => {
    const duplItem = cartItems.find(i => i.id === id)
    duplItem.quantity = duplItem.quantity - 1
    if (duplItem.quantity === 0) {
      setCartItems([...(cartItems.filter(i => i.id !== duplItem.id))]);
    } else {
      setCartItems([...cartItems]);
    }
  };

  const removeFromCart = (itemId) => {
    const updatedCart = cartItems.filter((item) => item.id !== itemId);
    setCartItems(updatedCart);
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider
      value={{cartItems, addToCart, removeFromCart, clearCart, incQuantity, decQuantity}}
    >
      {children}
    </CartContext.Provider>
  );
};

const useCart = () => {
  return useContext(CartContext);
};

export {CartProvider, useCart};
