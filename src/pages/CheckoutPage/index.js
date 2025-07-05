// Arquivo: src/pages/CheckoutPage/index.js

import React, { useState } from 'react';
import { useCart } from '../../contexts/CartContext';
import { useStore } from '../../contexts/StoreContext';
import { useNavigate } from 'react-router-dom';
import { db } from '../../services/firebaseConfig';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import toast from 'react-hot-toast';
import Button from '../../components/Button';
import {
  CheckoutWrapper,
  FormSection,
  OrderSummary,
  FormGroup,
  Input,
  SummaryTitle,
  SummaryList,
  SummaryItem,
  TotalRow
} from './styles';

const CheckoutPage = () => {
  const { cart, cartTotal, clearCart } = useCart();
  const store = useStore();
  const navigate = useNavigate();

  const [customerData, setCustomerData] = useState({
    name: '',
    phone: '',
    address: '',
    number: '',
    neighborhood: '',
    paymentMethod: 'pix',
  });
  const [loading, setLoading] = useState(false);

  const deliveryFee = store?.deliveryFee || 0;
  const finalTotal = cartTotal + deliveryFee;

  const handleChange = (e) => {
    setCustomerData({ ...customerData, [e.target.name]: e.target.value });
  };

  const formatOrderForWhatsApp = () => {
    let message = `*Novo Pedido - ${store.storeName}*\n\n`;
    message += "*Cliente:*\n";
    message += `${customerData.name}\n`;
    message += `Telefone: ${customerData.phone}\n`;
    message += `Endereço: ${customerData.address}, ${customerData.number}, ${customerData.neighborhood}\n\n`;
    message += "*Itens do Pedido:*\n";
    cart.forEach(item => {
      message += `- ${item.quantity}x ${item.name}`;
      if (item.size) message += ` (${item.size.name})`;
      message += ` - R$ ${(item.totalPrice * item.quantity).toFixed(2)}\n`;
      if (item.toppings && item.toppings.length > 0) {
        message += `  Adicionais: ${item.toppings.map(t => t.name).join(', ')}\n`;
      }
    });
    message += `\n*Subtotal:* R$ ${cartTotal.toFixed(2)}\n`;
    message += `*Taxa de Entrega:* R$ ${deliveryFee.toFixed(2)}\n`;
    message += `*TOTAL:* *R$ ${finalTotal.toFixed(2)}*\n\n`;
    message += `*Forma de Pagamento:* ${customerData.paymentMethod}`;

    return encodeURIComponent(message);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // 1. Guardar o pedido no banco de dados do Firestore
      const ordersCollectionRef = collection(db, 'orders');
      await addDoc(ordersCollectionRef, {
        tenantId: store.id,
        customer: customerData,
        items: cart,
        subtotal: cartTotal,
        deliveryFee: deliveryFee,
        total: finalTotal,
        status: 'pending', // Status inicial do pedido
        createdAt: serverTimestamp(),
      });

      // 2. Montar a mensagem e redirecionar para o WhatsApp
      const message = formatOrderForWhatsApp();
      const whatsappUrl = `https://wa.me/${store.whatsapp}?text=${message}`;
      
      toast.success('Pedido enviado! A redirecionar para o WhatsApp...');
      
      // Limpa o carrinho após o sucesso
      clearCart();

      // Redireciona para o WhatsApp
      window.location.href = whatsappUrl;

    } catch (error) {
      console.error("Erro ao finalizar o pedido: ", error);
      toast.error("Não foi possível enviar o seu pedido. Tente novamente.");
      setLoading(false);
    }
  };

  if (!store) {
    return <div>A carregar informações da loja...</div>;
  }

  return (
    <CheckoutWrapper>
      <FormSection onSubmit={handleSubmit}>
        <h2>Seus Dados para Entrega</h2>
        <FormGroup>
          <label>Nome Completo</label>
          <Input name="name" onChange={handleChange} required />
        </FormGroup>
        <FormGroup>
          <label>Telefone com DDD</label>
          <Input name="phone" type="tel" onChange={handleChange} placeholder="(XX) XXXXX-XXXX" required />
        </FormGroup>
        <FormGroup>
          <label>Rua / Avenida</label>
          <Input name="address" onChange={handleChange} required />
        </FormGroup>
        <FormGroup>
          <label>Número</label>
          <Input name="number" onChange={handleChange} required />
        </FormGroup>
        <FormGroup>
          <label>Bairro</label>
          <Input name="neighborhood" onChange={handleChange} required />
        </FormGroup>

        <h2>Forma de Pagamento</h2>
        <FormGroup>
          <select name="paymentMethod" value={customerData.paymentMethod} onChange={handleChange}>
            <option value="pix">PIX</option>
            <option value="dinheiro">Dinheiro</option>
            <option value="cartao">Cartão na Entrega</option>
          </select>
        </FormGroup>
        {customerData.paymentMethod === 'pix' && store.pixKey && (
          <div style={{border: '2px dashed #6d28d9', padding: '1rem', borderRadius: '8px', backgroundColor: '#f5f3ff'}}>
             <p>Realize o pagamento para a chave PIX abaixo e envie o comprovativo no WhatsApp:</p>
             <strong>{store.pixKey}</strong>
          </div>
        )}
      </FormSection>

      <OrderSummary>
        <SummaryTitle>Resumo do Pedido</SummaryTitle>
        <SummaryList>
          {cart.map(item => (
            <SummaryItem key={item.cartItemId}>
              <span>{item.quantity}x {item.name}</span>
              <span>R$ {(item.totalPrice * item.quantity).toFixed(2)}</span>
            </SummaryItem>
          ))}
          <SummaryItem>
            <span>Taxa de Entrega</span>
            <span>R$ {deliveryFee.toFixed(2)}</span>
          </SummaryItem>
        </SummaryList>
        <TotalRow>
          <strong>Total</strong>
          <strong>R$ {finalTotal.toFixed(2)}</strong>
        </TotalRow>
        <Button type="submit" form="checkout-form" disabled={loading} style={{width: '100%', marginTop: '1rem'}}>
          {loading ? 'A enviar...' : 'Enviar Pedido para WhatsApp'}
        </Button>
      </OrderSummary>
    </CheckoutWrapper>
  );
};

// Adiciona um `id` ao formulário para o botão conseguir "encontrá-lo"
const FormWithId = (props) => <form id="checkout-form" {...props} />;

export default CheckoutPage;