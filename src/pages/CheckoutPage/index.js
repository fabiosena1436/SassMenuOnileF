// Arquivo: src/pages/CheckoutPage/index.js (Versão Final com o JSX Corrigido)

import React, { useState, useEffect } from 'react';
import { useCart } from '../../contexts/CartContext';
import { useStore } from '../../contexts/StoreContext';
import { useNavigate } from 'react-router-dom';
import { db } from '../../services/firebaseConfig';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import toast from 'react-hot-toast';
import Button from '../../components/Button';

import {
  CheckoutWrapper, Title, Section, SectionTitle, FormGroup, Input,
  PaymentOption, ConditionalField, SummaryLine, GrandTotalLine, PixInstructions
} from './styles';

const CheckoutPage = () => {
  const { cart, cartTotal, clearCart } = useCart();
  const store = useStore();
  const navigate = useNavigate();

  const [customerData, setCustomerData] = useState({
    name: '', phone: '', address: '', number: '', neighborhood: '', complement: '',
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
  
  const handleCopyPixKey = () => {
    if(!store?.pixKey) return;
    navigator.clipboard.writeText(store.pixKey)
      .then(() => toast.success('Chave PIX copiada!'))
      .catch(() => toast.error('Falha ao copiar a chave.'));
  };

  const formatOrderForWhatsApp = () => {
    let message = `*Novo Pedido - ${store.storeName}*\n\n`;
    message += `*Cliente:* ${customerData.name}\n*Telefone:* ${customerData.phone}\n\n`;
    message += `*Endereço de Entrega:*\n${customerData.address}, ${customerData.number} - ${customerData.neighborhood}\n`;
    if(customerData.complement) message += `Complemento: ${customerData.complement}\n`;
    message += "\n*Itens do Pedido:*\n";
    cart.forEach(item => { 
        let itemLine = `- ${item.quantity}x ${item.name}`;
        if(item.size) itemLine += ` (${item.size.name})`;
        message += itemLine + "\n";
        if(item.toppings && item.toppings.length > 0) {
            message += `  *Adicionais:* ${item.toppings.map(t => t.name).join(', ')}\n`;
        }
    });
    message += `\n*Subtotal:* R$ ${cartTotal.toFixed(2).replace('.', ',')}\n`;
    message += `*Taxa de Entrega:* R$ ${deliveryFee.toFixed(2).replace('.', ',')}\n`;
    message += `*TOTAL:* *R$ ${finalTotal.toFixed(2).replace('.', ',')}*\n\n`;
    message += `*Forma de Pagamento:* ${paymentMethod}`;
    if (paymentMethod === 'dinheiro' && needsChange && changeFor) {
      message += ` (Levar troco para R$ ${changeFor})`;
    } else if (paymentMethod === 'pix') {
        message += ` (Chave: ${store.pixKey})`
    }
    return encodeURIComponent(message);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!store?.id) return toast.error("Não foi possível identificar a loja.");
    setLoading(true);

    try {
      await addDoc(collection(db, "tenants", store.id, "orders"), {
        items: cart, grandTotal: finalTotal, itemsSubtotal: cartTotal, deliveryFee: deliveryFee,
        status: 'Pendente', createdAt: serverTimestamp(), paymentMethod: paymentMethod,
        customerName: customerData.name, phone: customerData.phone,
        address: `${customerData.address}, ${customerData.number}, ${customerData.neighborhood}`,
        complement: customerData.complement, tenantId: store.id, storeName: store.storeName,
      });
      
      const message = formatOrderForWhatsApp();
      const whatsappUrl = `https://wa.me/${store.whatsapp}?text=${message}`;
      
      toast.success('Pedido enviado! A redirecionar...');
      clearCart();
      window.location.href = whatsappUrl;

    } catch (error) {
      console.error("Erro ao enviar pedido:", error);
      toast.error("Não foi possível enviar o seu pedido.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (store && !store.isStoreOpen) {
        toast.error("Desculpe, a loja está fechada.", { duration: 5000 });
        navigate(`/loja/${store.slug}`);
    }
  }, [store, navigate]);


  if (!store) return <CheckoutWrapper>Carregando informações da loja...</CheckoutWrapper>;

  return (
    <CheckoutWrapper>
      <form onSubmit={handleSubmit}>
        <Title>Finalizar Pedido</Title>
        <Section>
          <SectionTitle>1. Seus Dados</SectionTitle>
          <FormGroup><label htmlFor="name">Nome Completo</label><Input id="name" name="name" onChange={handleChange} value={customerData.name} required /></FormGroup>
          <FormGroup><label htmlFor="phone">Telefone (WhatsApp)</label><Input id="phone" name="phone" onChange={handleChange} value={customerData.phone} placeholder="Ex: 18999998888" required /></FormGroup>
        </Section>
        
        <Section>
          <SectionTitle>2. Endereço de Entrega</SectionTitle>
           <FormGroup><label htmlFor="address">Rua e Número</label><Input id="address" name="address" onChange={handleChange} value={customerData.address} required /></FormGroup>
           <FormGroup><label htmlFor="neighborhood">Bairro</label><Input id="neighborhood" name="neighborhood" onChange={handleChange} value={customerData.neighborhood} required /></FormGroup>
           <FormGroup><label htmlFor="complement">Complemento (Opcional)</label><Input id="complement" name="complement" onChange={handleChange} value={customerData.complement} placeholder="Ex: Casa, Apto, Bloco, etc."/></FormGroup>
        </Section>

        <Section>
          <SectionTitle>3. Forma de Pagamento</SectionTitle>
          {/* Opção Dinheiro */}
          <PaymentOption $isSelected={paymentMethod === 'dinheiro'}>
            <input type="radio" name="paymentMethod" value="dinheiro" checked={paymentMethod === 'dinheiro'} onChange={(e) => setPaymentMethod(e.target.value)} /> Dinheiro
          </PaymentOption>
          {paymentMethod === 'dinheiro' && (
            <ConditionalField>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><input type="checkbox" checked={needsChange} onChange={(e) => setNeedsChange(e.target.checked)} /> Precisa de troco?</label>
              {needsChange && (<FormGroup style={{marginTop: '1rem'}}><label htmlFor="changeFor">Troco para quanto?</label><Input type="number" id="changeFor" placeholder="Ex: 50" value={changeFor} onChange={(e) => setChangeFor(e.target.value)}/></FormGroup>)}
            </ConditionalField>
          )}

          {/* Opção Cartão */}
          <PaymentOption $isSelected={paymentMethod === 'cartao'}>
            <input type="radio" name="paymentMethod" value="cartao" checked={paymentMethod === 'cartao'} onChange={(e) => setPaymentMethod(e.target.value)} /> Cartão (na entrega)
          </PaymentOption>
          
          {/* Opção PIX */}
          {store.pixKey && (
            <>
              <PaymentOption $isSelected={paymentMethod === 'pix'}>
                  <input type="radio" name="paymentMethod" value="pix" checked={paymentMethod === 'pix'} onChange={(e) => setPaymentMethod(e.target.value)} /> PIX
              </PaymentOption>
              {paymentMethod === 'pix' && (
                <PixInstructions>
                  <p>Copie a chave PIX e pague no seu app do banco:</p>
                  <strong>{store.pixKey}</strong>
                  <br />
                  <button type="button" onClick={handleCopyPixKey}>Copiar Chave</button>
                </PixInstructions>
              )}
            </>
          )}
        </Section>
        
        <Section>
             <SummaryLine><span>Subtotal:</span><span>R$ {cartTotal.toFixed(2).replace('.', ',')}</span></SummaryLine>
             {/* --- ERRO DE DIGITAÇÃO CORRIGIDO AQUI --- */}
             <SummaryLine><span>Taxa de Entrega:</span><span>R$ {deliveryFee.toFixed(2).replace('.', ',')}</span></SummaryLine>
             <GrandTotalLine><span>Total a Pagar:</span><span>R$ {finalTotal.toFixed(2).replace('.', ',')}</span></GrandTotalLine>
        </Section>

        <Button type="submit" disabled={loading} style={{width: '100%', marginTop: '2rem', padding: '1rem'}}>
          {loading ? 'A enviar...' : `Enviar Pedido via WhatsApp`}
        </Button>
      </form>
    </CheckoutWrapper>
  );
};

export default CheckoutPage;