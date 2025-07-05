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
  CheckoutWrapper, Title, Section, SectionTitle, FormGroup, Input,
  PaymentOption, ConditionalField
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
  });
  const [paymentMethod, setPaymentMethod] = useState('pix');
  const [needsChange, setNeedsChange] = useState(false);
  const [changeFor, setChangeFor] = useState('');
  const [loading, setLoading] = useState(false);

  const deliveryFee = store?.deliveryFee || 0;
  const finalTotal = cartTotal + deliveryFee;

  const handleChange = (e) => {
    setCustomerData({ ...customerData, [e.target.name]: e.target.value });
  };

  const formatOrderForWhatsApp = () => {
    let message = `*Novo Pedido - ${store.storeName}*\n\n`;
    message += `*Cliente:* ${customerData.name}\n`;
    message += `*Telefone:* ${customerData.phone}\n`;
    message += `*Endereço:* ${customerData.address}, ${customerData.number}, ${customerData.neighborhood}\n\n`;
    message += "*Itens do Pedido:*\n";
    cart.forEach(item => { message += `- ${item.quantity}x ${item.name}\n`; });
    message += `\n*Subtotal:* R$ ${cartTotal.toFixed(2)}\n`;
    message += `*Taxa de Entrega:* R$ ${deliveryFee.toFixed(2)}\n`;
    message += `*TOTAL:* *R$ ${finalTotal.toFixed(2)}*\n\n`;
    message += `*Pagamento:* ${paymentMethod}`;
    if (paymentMethod === 'dinheiro' && needsChange && changeFor) {
      message += ` (Levar troco para R$ ${changeFor})`;
    }
    
    return encodeURIComponent(message);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await addDoc(collection(db, "orders"), {
        tenantId: store.id,
        customer: customerData,
        items: cart,
        total: finalTotal,
        status: 'pending',
        createdAt: serverTimestamp(),
      });
      
      const message = formatOrderForWhatsApp();
      const whatsappUrl = `https://wa.me/${store.whatsapp}?text=${message}`;
      
      toast.success('Pedido enviado! A redirecionar...');
      clearCart();
      window.location.href = whatsappUrl;

    } catch (error) {
      toast.error("Não foi possível enviar o seu pedido.");
    } finally {
      setLoading(false);
    }
  };

  if (!store) return <div>Carregando...</div>;

  return (
    <CheckoutWrapper>
      <form onSubmit={handleSubmit}>
        <Title>Finalizar Pedido</Title>
        <Section>
          <SectionTitle>Seus Dados</SectionTitle>
          <FormGroup>
            <label>Nome Completo</label>
            <Input name="name" onChange={handleChange} required />
          </FormGroup>
          {/* ... outros FormGroups para endereço, etc. ... */}
        </Section>

        <Section>
          <SectionTitle>Forma de Pagamento</SectionTitle>
          <PaymentOption $isSelected={paymentMethod === 'dinheiro'}>
            <input type="radio" name="paymentMethod" value="dinheiro" checked={paymentMethod === 'dinheiro'} onChange={(e) => setPaymentMethod(e.target.value)} /> Dinheiro
          </PaymentOption>
          {paymentMethod === 'dinheiro' && (
            <ConditionalField>
              <label>
                <input type="checkbox" checked={needsChange} onChange={(e) => setNeedsChange(e.target.checked)} /> Precisa de troco?
              </label>
              {needsChange && (
                <FormGroup style={{marginTop: '1rem'}}>
                  <label>Troco para quanto?</label>
                  <Input type="number" placeholder="Ex: 50" value={changeFor} onChange={(e) => setChangeFor(e.target.value)}/>
                </FormGroup>
              )}
            </ConditionalField>
          )}

          <PaymentOption $isSelected={paymentMethod === 'cartao'}>
            <input type="radio" name="paymentMethod" value="cartao" checked={paymentMethod === 'cartao'} onChange={(e) => setPaymentMethod(e.target.value)} /> Cartão (Crédito/Débito na entrega)
          </PaymentOption>
          
          <PaymentOption $isSelected={paymentMethod === 'pix'}>
            <input type="radio" name="paymentMethod" value="pix" checked={paymentMethod === 'pix'} onChange={(e) => setPaymentMethod(e.target.value)} /> PIX
          </PaymentOption>
        </Section>

        <Button type="submit" disabled={loading} style={{width: '100%', marginTop: '2rem'}}>
          {loading ? 'A enviar...' : `Enviar Pedido para WhatsApp (R$ ${finalTotal.toFixed(2)})`}
        </Button>
      </form>
    </CheckoutWrapper>
  );
};

export default CheckoutPage;