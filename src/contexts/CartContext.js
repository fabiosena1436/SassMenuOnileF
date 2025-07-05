// Arquivo: src/contexts/CartContext.js

import React, { createContext, useState, useContext, useEffect } from 'react';
import toast from 'react-hot-toast';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);

  // ... (resto do seu código do CartProvider)
  const addToCart = (product, quantity, options = [], notes = '', totalPrice) => {
    // ...
  };

  const removeFromCart = (productId) => {
    // ...
  };

  const updateQuantity = (productId, newQuantity) => {
    // ...
  };

  const clearCart = () => {
    // ...
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        total,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  // Adicionamos esta verificação
  if (context === undefined) {
    throw new Error('useCart deve ser usado dentro de um CartProvider');
  }
  return context;
};