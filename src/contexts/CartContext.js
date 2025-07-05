// Arquivo: src/contexts/CartContext.js

import React, { createContext, useState, useContext, useEffect } from 'react';
import toast from 'react-hot-toast';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  // Inicializamos o carrinho com dados guardados no localStorage, se existirem.
  const [cart, setCart] = useState(() => {
    try {
      const localData = localStorage.getItem('sass-menu:cart');
      return localData ? JSON.parse(localData) : [];
    } catch (error) {
      return [];
    }
  });

  const [cartTotal, setCartTotal] = useState(0);
  const [totalItems, setTotalItems] = useState(0);

  // Sempre que o carrinho mudar, guarda no localStorage e recalcula os totais.
  useEffect(() => {
    localStorage.setItem('sass-menu:cart', JSON.stringify(cart));
    
    const newTotal = cart.reduce((acc, item) => acc + item.totalPrice * item.quantity, 0);
    setCartTotal(newTotal);

    const newTotalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
    setTotalItems(newTotalItems);
  }, [cart]);

  /**
   * Adiciona um produto ao carrinho.
   * Se um item idêntico (mesmo produto e mesmas opções) já existir, apenas incrementa a quantidade.
   */
  const addToCart = (productToAdd) => {
    // Verificamos se um item exatamente igual já existe no carrinho
    const existingItemIndex = cart.findIndex(item => item.cartItemId === productToAdd.cartItemId);

    if (existingItemIndex !== -1) {
      // Se existe, criamos um novo array de carrinho e atualizamos a quantidade do item existente
      const updatedCart = [...cart];
      updatedCart[existingItemIndex].quantity += productToAdd.quantity;
      setCart(updatedCart);
    } else {
      // Se não existe, adicionamos o novo produto ao carrinho
      setCart(prevCart => [...prevCart, productToAdd]);
    }
    toast.success(`${productToAdd.name} adicionado ao carrinho!`);
  };

  /**
   * Remove um item completamente do carrinho, usando o seu ID único.
   */
  const removeFromCart = (cartItemId) => {
    setCart(prevCart => prevCart.filter(item => item.cartItemId !== cartItemId));
    toast.error("Item removido do carrinho.");
  };

  /**
   * Atualiza a quantidade de um item específico no carrinho.
   * Se a quantidade chegar a 0, o item é removido.
   */
  const updateQuantity = (cartItemId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCart(prevCart => 
      prevCart.map(item => 
        item.cartItemId === cartItemId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  /**
   * Limpa todos os itens do carrinho.
   */
  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartTotal,
        totalItems
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart deve ser usado dentro de um CartProvider');
  }
  return context;
};