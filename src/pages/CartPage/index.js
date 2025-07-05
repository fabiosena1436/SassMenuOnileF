// Arquivo: src/pages/CartPage/index.js

import React from 'react';
import { useCart } from '../../contexts/CartContext';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button';
import { FiTrash2 } from 'react-icons/fi';
import {
    CartPageContainer, EmptyCart, CartGrid, CartHeader, CartItemsList,
    CartItem, ItemImage, ItemDetails, ItemName, ItemOptions, ItemPrice,
    ItemQuantity, ItemActions, CartSummary, SummaryTotal, BackButton
} from './styles';

const CartPage = () => {
    const { cart, removeFromCart, updateQuantity, cartTotal, totalItems } = useCart();
    const navigate = useNavigate();

    if (cart.length === 0) {
        return (
            <CartPageContainer>
                <EmptyCart>
                    <h2>Seu carrinho está vazio</h2>
                    <p>Adicione produtos do nosso cardápio para continuar.</p>
                    <Button onClick={() => navigate(-1)}>Voltar ao Cardápio</Button>
                </EmptyCart>
            </CartPageContainer>
        );
    }

    return (
        <CartPageContainer>
            <h1>Meu Carrinho</h1>
            <CartGrid>
                <CartItemsList>
                    <CartHeader>
                        <span>Produto</span>
                        <span>Qtd.</span>
                        <span>Subtotal</span>
                        <span></span>
                    </CartHeader>
                    {cart.map(item => (
                        <CartItem key={item.cartItemId}>
                            <ItemImage src={item.imageUrl || 'https://via.placeholder.com/100'} alt={item.name} />
                            <ItemDetails>
                                <ItemName>{item.name}</ItemName>
                                {item.size && <ItemOptions>Tamanho: {item.size.name}</ItemOptions>}
                                {item.toppings && item.toppings.length > 0 &&
                                    <ItemOptions>Adicionais: {item.toppings.map(t => t.name).join(', ')}</ItemOptions>
                                }
                                {item.notes && <ItemOptions><i>Obs: {item.notes}</i></ItemOptions>}
                            </ItemDetails>
                            <ItemQuantity>
                                <button onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)}>-</button>
                                <span>{item.quantity}</span>
                                <button onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)}>+</button>
                            </ItemQuantity>
                            <ItemPrice>R$ {(item.totalPrice * item.quantity).toFixed(2)}</ItemPrice>
                            <ItemActions>
                                <button onClick={() => removeFromCart(item.cartItemId)}><FiTrash2 /></button>
                            </ItemActions>
                        </CartItem>
                    ))}
                </CartItemsList>

                <CartSummary>
                    <h2>Resumo do Pedido</h2>
                    <SummaryTotal>
                        <span>Total ({totalItems} itens)</span>
                        <strong>R$ {cartTotal.toFixed(2)}</strong>
                    </SummaryTotal>
                    <Button onClick={() => navigate('../checkout')}>Finalizar Pedido</Button>
                    <BackButton onClick={() => navigate(-1)}>Continuar a comprar</BackButton>
                </CartSummary>
            </CartGrid>
        </CartPageContainer>
    );
};

export default CartPage;