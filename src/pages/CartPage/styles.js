import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const CartPageWrapper = styled.div`
  max-width: 800px;
  margin: 2rem auto;
  padding: 2rem;
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    margin: 0;
    padding: 1rem;
    border-radius: 0;
    box-shadow: none;
    min-height: 100vh;
  }
`;

export const Title = styled.h1`
  text-align: center;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: 2rem;
  font-size: 2rem;

  @media (max-width: 480px) {
    font-size: 1.5rem;
    margin-bottom: 1.5rem;
  }
`;

export const CartItem = styled.div`
  display: grid;
  grid-template-columns: auto 1fr auto auto auto;
  align-items: center;
  gap: 1.5rem;
  padding: 1rem 0;
  border-bottom: 1px solid #e5e7eb;

  &:last-of-type {
    border-bottom: none;
  }

  @media (max-width: 768px) {
    grid-template-columns: auto 1fr auto;
    grid-template-rows: auto auto;
    gap: 0.5rem 1rem;
    padding: 1rem 0;
  }
`;

export const ItemImage = styled.img`
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 8px;

  @media (max-width: 768px) {
    grid-row: 1 / 3;
  }
`;

export const ItemDetails = styled.div`
  flex-grow: 1;

  @media (max-width: 768px) {
    grid-column: 2 / 4;
  }
`;

export const ItemName = styled.h4`
  margin: 0 0 0.25rem;
  font-size: 1.1rem;
  font-weight: 600;

  @media (max-width: 480px) {
    font-size: 1rem;
  }
`;

export const ItemPrice = styled.p`
  margin: 0;
  color: #6b7280;
  font-size: 0.9rem;
`;

export const ItemSubtotal = styled.p`
  font-weight: 700;
  font-size: 1.1rem;
  color: #111827;
  min-width: 80px;
  text-align: right;

  @media (max-width: 768px) {
    grid-column: 3 / 4;
    grid-row: 2 / 3;
    text-align: right;
  }
`;

export const QuantityControl = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  button {
    background-color: #f3f4f6;
    border: 1px solid #e5e7eb;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    font-size: 1.2rem;
    cursor: pointer;
    &:hover {
      background-color: #e5e7eb;
    }
  }

  span {
    font-weight: 600;
    font-size: 1.1rem;
    min-width: 20px;
    text-align: center;
  }
  
  @media (max-width: 768px) {
    grid-row: 2 / 3;
    grid-column: 2 / 3;
    justify-self: start;
  }
`;

export const RemoveButton = styled.button`
  background: none;
  border: none;
  color: #ef4444;
  font-size: 1.2rem;
  cursor: pointer;
  padding: 0.5rem;

  &:hover {
    color: #b91c1c;
  }
`;

export const TotalsSection = styled.div`
  margin-top: 2rem;
  padding-top: 1.5rem;
  border-top: 2px solid #e5e7eb;
`;

export const SummaryLine = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.75rem;
  font-size: 1rem;
  color: #4b5563;

  strong {
    color: #111827;
    font-weight: 600;
  }
`;

export const GrandTotalLine = styled(SummaryLine)`
  font-size: 1.25rem;
  font-weight: bold;
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid #e5e7eb;

  strong {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

export const ActionsWrapper = styled.div`
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const TopButtonsContainer = styled.div`
  display: flex;
  gap: 1rem;

  @media (max-width: 480px) {
    flex-direction: column;
  }
`;

export const EmptyCartMessage = styled.div`
  text-align: center;
  padding: 3rem;

  p {
    margin-bottom: 1.5rem;
    color: #6b7280;
  }

  @media (max-width: 480px) {
    padding: 2rem 1rem;
  }
`;