// Arquivo: src/pages/Admin/PrintableReceiptPage/index.js (Versão Final com Preço Corrigido)

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../../services/firebaseConfig';
import { useAuth } from '../../../contexts/AuthContext';

import {
  ReceiptWrapper, Header, Section, InfoLine, ItemList, Item, AddressBlock,
  Totals, Footer, PrintButton, PrintStyles
} from './styles';

const PrintableReceiptPage = () => {
  const { orderId } = useParams();
  const { tenant } = useAuth();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!orderId || !tenant?.id) return;

    const fetchOrder = async () => {
      setLoading(true);
      try {
        const orderDocRef = doc(db, 'tenants', tenant.id, 'orders', orderId);
        const docSnap = await getDoc(orderDocRef);

        if (docSnap.exists()) {
          setOrder({ id: docSnap.id, ...docSnap.data() });
          setTimeout(() => window.print(), 500);
        } else {
          console.error("Pedido não encontrado!");
        }
      } catch (error) {
        console.error("Erro ao buscar pedido:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderId, tenant]);

  if (loading) {
    return <p>A carregar recibo...</p>;
  }

  if (!order) {
    return <p>Pedido não encontrado ou dados insuficientes para gerar o recibo.</p>;
  }

  const needsChange = order.paymentMethod === 'dinheiro' && order.changeFor && order.changeFor > order.grandTotal;
  const changeAmount = needsChange ? order.changeFor - order.grandTotal : 0;

  return (
    <>
      <PrintStyles />
      <ReceiptWrapper>
        <Header>
          {tenant.logoUrl && <img src={tenant.logoUrl} alt="Logo da Loja" />}
          <h1>{tenant.storeName}</h1>
          <p>{tenant.address}</p>
        </Header>

        <Section>
          <InfoLine><span>Pedido:</span> <span>#{order.id.substring(0, 8)}</span></InfoLine>
          <InfoLine><span>Data:</span> <span>{order.createdAt?.toDate().toLocaleString('pt-BR')}</span></InfoLine>
        </Section>
        
        <Section>
          <h4>Entregar para:</h4>
          <AddressBlock>
            <p><strong>{order.customerName}</strong></p>
            <p>{order.address}</p>
            {order.neighborhood && <p>Bairro: {order.neighborhood}</p>}
            {order.complement && <p>Complemento: {order.complement}</p>}
            <p>Telefone: {order.phone}</p>
          </AddressBlock>
        </Section>

        <Section>
          <h4>Itens do Pedido</h4>
          <ItemList>
            {order.items.map((item, index) => (
              <Item key={index}>
                <div className="item-header">
                  <span>{item.quantity}x {item.name}</span>
                  {/* --- CORREÇÃO PRINCIPAL AQUI --- */}
                  {/* Trocado item.price por item.totalPrice para buscar o preço unitário correto */}
                  <span>R$ {((item.totalPrice || 0) * (item.quantity || 1)).toFixed(2)}</span>
                </div>
                {(item.size || (item.toppings && item.toppings.length > 0)) && (
                  <div className="item-details">
                    {item.size && `Tamanho: ${item.size.name}`}
                    {item.toppings && item.toppings.length > 0 && 
                      (<div>Adicionais: {item.toppings.map(t => t.name).join(', ')}</div>)
                    }
                  </div>
                )}
              </Item>
            ))}
          </ItemList>
        </Section>
        
        <Section>
          <Totals>
            <InfoLine><span>Subtotal:</span> <span>R$ {order.itemsSubtotal.toFixed(2)}</span></InfoLine>
            <InfoLine><span>Taxa de Entrega:</span> <span>R$ {order.deliveryFee.toFixed(2)}</span></InfoLine>
            <InfoLine style={{fontWeight: 'bold', fontSize: '1.1rem', marginTop: '0.5rem'}}>
              <span>TOTAL:</span> 
              <span>R$ {order.grandTotal.toFixed(2)}</span>
            </InfoLine>
          </Totals>
        </Section>

        <Section>
          <InfoLine><span>Pagamento:</span> <span>{order.paymentMethod}</span></InfoLine>
          {needsChange && (
              <>
                <InfoLine><span>Pagar com:</span> <span>R$ {order.changeFor.toFixed(2)}</span></InfoLine>
                <InfoLine style={{fontWeight: 'bold', color: '#c0392b'}}>
                    <span>TROCO:</span> 
                    <span>R$ {changeAmount.toFixed(2)}</span>
                </InfoLine>
              </>
          )}
        </Section>

        <Footer>
          <p>Obrigado pela preferência!</p>
        </Footer>
        
        <PrintButton onClick={() => window.print()}>
          Imprimir Novamente
        </PrintButton>

      </ReceiptWrapper>
    </>
  );
};

export default PrintableReceiptPage;