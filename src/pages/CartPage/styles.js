import styled from 'styled-components';
import { Link } from 'react-router-dom'; // Adicionado para os botões

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
  display: flex;
  align-items: center;
  gap: 1.5rem;
  padding: 1rem 0;
  border-bottom: 1px solid #e5e7eb;

  &:last-of-type {
    border-bottom: none;
  }

  @media (max-width: 480px) {
    flex-wrap: wrap; // Permite que os itens quebrem a linha
    gap: 1rem;
  }
`;

export const ItemImage = styled.img`
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 8px;

  @media (max-width: 480px) {
    width: 60px;
    height: 60px;
  }
`;

export const ItemDetails = styled.div`
  flex-grow: 1;
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

  @media (max-width: 480px) {
    // No modo "wrap", o subtotal vai para a próxima linha
    width: 100%;
    text-align: right;
    margin-top: 0.5rem;
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

// Adicionando um link estilizado para "Continuar Comprando", caso precise.
export const ContinueShoppingButton = styled(Link)`
  flex-grow: 1;
  text-align: center;
  padding: 0.75rem 1rem;
  background-color: #f3f4f6;
  color: #374151;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 600;
  border: 1px solid #e5e7eb;

  &:hover {
    background-color: #e5e7eb;
  }
`;

// Adicionando o botão de Checkout, caso precise.
export const CheckoutButton = styled(Link)`
  flex-grow: 1;
  text-align: center;
  padding: 0.75rem 1rem;
  background-color: ${({ theme }) => theme.colors.success};
  color: white;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 600;

  &:hover {
    background-color: ${({ theme }) => theme.colors.successDark};
  }
`;