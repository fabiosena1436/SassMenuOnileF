// Arquivo: src/pages/CartPage/index.js

import React from 'react';
import { useCart } from '../../contexts/CartContext';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../../components/Button';
import { FiTrash2 } from 'react-icons/fi';
import toast from 'react-hot-toast';
import { useStore } from '../../contexts/StoreContext';

import {
  CartPageWrapper, Title, EmptyCartMessage, CartItem, ItemImage, ItemDetails, ItemName, 
  ItemPrice, QuantityControl, ItemSubtotal, RemoveButton, TotalsSection,
  SummaryLine, GrandTotalLine, ActionsWrapper, TopButtonsContainer
} from './styles';

const CartPage = () => {
  const { cart, removeFromCart, updateQuantity, clearCart, cartTotal } = useCart();
  const store = useStore();
  const navigate = useNavigate();
  const deliveryFee = store?.deliveryFee || 0;
  const grandTotal = cartTotal + deliveryFee;

  const handleConfirmClearCart = () => {
    clearCart();
    toast.success('Carrinho esvaziado.');
  };

  const handleProceedToCheckout = () => {
    if (cart.length === 0) {
      toast.error("Seu carrinho está vazio!");
      return;
    }
    navigate(`../checkout`);
  };

  if (cart.length === 0) {
    return (
      <CartPageWrapper>
        <Title>Seu Carrinho</Title>
        <EmptyCartMessage>
          <p>Seu carrinho está vazio. Que tal adicionar alguns produtos?</p>
          <Button onClick={() => navigate(`../cardapio`)}>Ver Cardápio</Button>
        </EmptyCartMessage>
      </CartPageWrapper>
    );
  }

  return (
    <CartPageWrapper>
      <Title>Seu Carrinho</Title>
      <div>
        {cart.map(item => (
          <CartItem key={item.cartItemId}>
            <ItemImage src={item.imageUrl || 'https://via.placeholder.com/100'} alt={item.name} />
            <ItemDetails>
              <ItemName>{item.name}</ItemName>
              <ItemPrice>R$ {item.totalPrice.toFixed(2)} / un.</ItemPrice>
            </ItemDetails>
            <QuantityControl>
              <button onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)}>-</button>
              <span>{item.quantity}</span>
              <button onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)}>+</button>
            </QuantityControl>
            <ItemSubtotal>R$ {(item.totalPrice * item.quantity).toFixed(2)}</ItemSubtotal>
            <RemoveButton onClick={() => removeFromCart(item.cartItemId)}>
              <FiTrash2 />
            </RemoveButton>
          </CartItem>
        ))}
      </div>
      <TotalsSection>
        <SummaryLine>
          <span>Subtotal dos Itens:</span>
          <strong>R$ {cartTotal.toFixed(2)}</strong>
        </SummaryLine>
        <SummaryLine>
          <span>Taxa de Entrega:</span>
          <strong>R$ {deliveryFee.toFixed(2)}</strong>
        </SummaryLine>
        <GrandTotalLine>
          <span>Total Geral:</span>
          <strong>R$ {grandTotal.toFixed(2)}</strong>
        </GrandTotalLine>
      </TotalsSection>
      <ActionsWrapper>
        <TopButtonsContainer>
          <Button $variant="secondary" onClick={() => navigate(`../cardapio`)} style={{flex: 1}}>Continuar Comprando</Button>
          <Button $variant="danger" onClick={handleConfirmClearCart}>Limpar Carrinho</Button>
        </TopButtonsContainer>
        <Button $variant="primary" onClick={handleProceedToCheckout}>Finalizar Compra</Button>
      </ActionsWrapper>
    </CartPageWrapper>
  );
};

export default CartPage;