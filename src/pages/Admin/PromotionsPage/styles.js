// Arquivo: src/pages/Admin/PromotionsPage/styles.js
import styled from 'styled-components';

export const PageWrapper = styled.div`
  padding: 2rem;
  
  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

export const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

export const Title = styled.h1`
  font-size: 2rem;
  color: #1a202c;

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

export const FormContainer = styled.form`
  background-color: #ffffff;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  margin-bottom: 2.5rem;

  h3 {
    margin-top: 0;
    margin-bottom: 1.5rem;
    font-size: 1.5rem;
  }

  @media (max-width: 768px) {
    padding: 1.5rem;
  }
`;

export const FormGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;

  @media (max-width: 992px) {
    grid-template-columns: 1fr;
  }
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;

  label {
    margin-bottom: 0.5rem;
    font-weight: 600;
    color: #4a5568;
  }
`;

export const Input = styled.input`
  padding: 0.75rem 1rem;
  border: 1px solid #cbd5e0;
  border-radius: 6px;
  font-size: 1rem;
`;

export const Select = styled.select`
  padding: 0.75rem 1rem;
  border: 1px solid #cbd5e0;
  border-radius: 6px;
  font-size: 1rem;
  background-color: white;
`;

export const ActionButtons = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 1.5rem;
`;

export const PromotionList = styled.div`
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const PromotionListItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  background-color: #fff;
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.07);
  border-left: 5px solid ${({ $isActive }) => ($isActive ? '#22c55e' : '#a1a1aa')};

  /* --- MUDANÇA PARA RESPONSIVIDADE --- */
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start; /* Alinha itens à esquerda */
    gap: 1rem;
  }
`;

export const PromoImage = styled.img`
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 6px;
  flex-shrink: 0;
`;

export const PromoInfo = styled.div`
  flex-grow: 1;
  h4 {
    margin: 0 0 0.25rem;
  }
  p {
    margin: 0;
    font-size: 0.9rem;
    color: #6b7280;
  }
`;

export const PromoStatus = styled.span`
  font-size: 0.8rem;
  font-weight: bold;
  padding: 4px 8px;
  border-radius: 12px;
  color: ${({ $isActive }) => ($isActive ? '#166534' : '#3f3f46')};
  background-color: ${({ $isActive }) => ($isActive ? '#bbf7d0' : '#e4e4e7')};

  /* --- MUDANÇA PARA RESPONSIVIDADE --- */
  @media (max-width: 768px) {
    align-self: flex-start;
  }
`;

export const PromoActions = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-shrink: 0;

  /* --- MUDANÇA PARA RESPONSIVIDADE --- */
  @media (max-width: 768px) {
    width: 100%;
    
    button {
      flex-grow: 1; /* Faz os botões ocuparem espaço igual */
    }
  }
`;

export const LoadingText = styled.p`
  text-align: center;
  padding: 2rem;
  font-style: italic;
  color: #6b7280;
`;

export const InfoText = styled.p`
  text-align: center;
  padding: 2rem;
  background-color: #f8f9fa;
  border-radius: 8px;
`;