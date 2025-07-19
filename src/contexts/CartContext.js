import React, { createContext, useContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast'; // O toast ainda pode ser útil para outras funções

const CartContext = createContext({});

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    try {
      const localData = localStorage.getItem('cart');
      return localData ? JSON.parse(localData) : [];
    } catch (error) {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    setCart(prevCart => {
      // Lógica para verificar se o item já existe e atualizar a quantidade
      const existingItem = prevCart.find(item => item.cartItemId === product.cartItemId);
      if (existingItem) {
        return prevCart.map(item =>
          item.cartItemId === product.cartItemId
            ? { ...item, quantity: item.quantity + product.quantity }
            : item
        );
      }
      // Adiciona o novo produto ao carrinho
      return [...prevCart, product];
    });
    
    // <<< LINHA REMOVIDA DAQUI >>>
    // toast.success('Produto adicionado ao carrinho!'); 
  };

  const removeFromCart = (cartItemId) => {
    setCart(prevCart => prevCart.filter(item => item.cartItemId !== cartItemId));
    toast.error('Item removido do carrinho.');
  };

  const updateQuantity = (cartItemId, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(cartItemId);
      return;
    }
    setCart(prevCart =>
      prevCart.map(item =>
        item.cartItemId === cartItemId ? { ...item, quantity: newQuantity } : item
      )
    );
  };
  
  const clearCart = () => {
    setCart([]);
  };

  const cartTotal = cart.reduce((total, item) => total + (item.totalPrice * item.quantity), 0);
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart, cartTotal, totalItems }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);