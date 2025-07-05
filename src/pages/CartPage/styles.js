// Arquivo: src/pages/CartPage/styles.js

import styled from 'styled-components';

export const CartPageContainer = styled.div`
  max-width: 1200px;
  margin: 2rem auto;
  padding: 1rem;
  h1 {
    text-align: center;
    margin-bottom: 2rem;
  }
`;

export const EmptyCart = styled.div`
  text-align: center;
  padding: 4rem;
  background: #f9fafb;
  border-radius: 8px;
  h2 { margin-bottom: 1rem; }
  p { margin-bottom: 2rem; color: #6b7280; }
`;

export const CartGrid = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 2rem;
  align-items: flex-start;

  @media (max-width: 992px) {
    grid-template-columns: 1fr;
  }
`;

export const CartItemsList = styled.div``;

export const CartHeader = styled.div`
  display: grid;
  grid-template-columns: 3fr 1fr 1fr 0.5fr;
  gap: 1rem;
  padding-bottom: 1rem;
  margin-bottom: 1rem;
  border-bottom: 2px solid #e5e7eb;
  font-weight: 600;
  color: #6b7280;
  text-transform: uppercase;
  font-size: 0.9rem;
  @media (max-width: 768px) {
    display: none;
  }
`;

export const CartItem = styled.div`
  display: grid;
  grid-template-columns: auto 1fr auto auto auto;
  gap: 1.5rem;
  align-items: center;
  padding: 1rem 0;
  border-bottom: 1px solid #f3f4f6;

  @media (max-width: 768px) {
    grid-template-columns: auto 1fr;
    grid-template-rows: auto auto auto;
  }
`;

export const ItemImage = styled.img`
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 8px;
  grid-row: span 1;
  @media (max-width: 768px) {
    grid-row: span 3;
  }
`;

export const ItemDetails = styled.div``;

export const ItemName = styled.h3`
  font-size: 1.1rem;
  font-weight: 600;
  margin: 0;
`;

export const ItemOptions = styled.p`
  font-size: 0.85rem;
  color: #6b7280;
  margin: 4px 0 0;
`;

export const ItemQuantity = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  
  button {
    background: none;
    border: none;
    padding: 0.5rem 0.75rem;
    cursor: pointer;
    font-size: 1.2rem;
    color: #9ca3af;
    &:hover { color: #111827; }
  }

  span {
    padding: 0 0.5rem;
    font-weight: 500;
  }
`;

export const ItemPrice = styled.div`
  font-weight: 600;
  font-size: 1.1rem;
`;

export const ItemActions = styled.div`
  button {
    background: none;
    border: none;
    cursor: pointer;
    color: #9ca3af;
    font-size: 1.2rem;
    &:hover { color: #ef4444; }
  }
`;

export const CartSummary = styled.aside`
  background-color: #f9fafb;
  padding: 1.5rem;
  border-radius: 8px;
  position: sticky;
  top: 90px;
  h2 {
    margin-top: 0;
    margin-bottom: 1.5rem;
    border-bottom: 1px solid #e5e7eb;
    padding-bottom: 1rem;
  }
  button {
      width: 100%;
  }
`;

export const SummaryTotal = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1.2rem;
  margin-bottom: 1.5rem;
`;

export const BackButton = styled.button`
    background: none;
    border: none;
    color: #4f46e5;
    font-weight: 600;
    cursor: pointer;
    margin-top: 1rem;
    padding: 0.5rem;
    &:hover {
        text-decoration: underline;
    }
`;