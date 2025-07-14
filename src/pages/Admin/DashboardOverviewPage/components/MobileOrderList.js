import React from 'react';
import styled from 'styled-components';

const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const OrderCard = styled.div`
  background: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.lightGray};
  border-radius: 8px;
  padding: 1rem;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
`;

const OrderHeader = styled.div`
  display: flex;
  justify-content: space-between;
  font-weight: bold;
  margin-bottom: 0.5rem;
`;

const OrderBody = styled.div`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.gray};
`;

export default function MobileOrderList({ orders }) {
  if (!orders || orders.length === 0) {
    return <p>Nenhum pedido recente.</p>;
  }

  return (
    <ListContainer>
      {orders.map(order => (
        <OrderCard key={order.id}>
          <OrderHeader>
            <span>{order.customerName}</span>
            <span>{order.total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
          </OrderHeader>
          <OrderBody>
            <span>{order.createdAt?.toDate().toLocaleDateString('pt-BR')}</span> - <span>{order.status}</span>
          </OrderBody>
        </OrderCard>
      ))}
    </ListContainer>
  );
}