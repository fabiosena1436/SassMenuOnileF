// Arquivo: src/pages/Admin/PromotionsPage/styles.js

import styled from 'styled-components';

export const PageWrapper = styled.div`
  padding: 2rem;
  max-width: 1000px;
  margin: 0 auto;
`;

export const Header = styled.header`
  margin-bottom: 2rem;
`;

export const Title = styled.h1`
  font-size: 2.5rem;
  color: #1f2937;
`;

export const FormContainer = styled.form`
  background-color: #fff;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.08);
  margin-bottom: 2.5rem;

  h3 {
    margin-top: 0;
    margin-bottom: 1.5rem;
    font-size: 1.5rem;
  }
`;

export const FormGroup = styled.div`
  margin-bottom: 1rem;
  
  label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 600;
  }
`;

export const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 1rem;
`;

export const Select = styled.select`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 1rem;
  background-color: white;
`;

export const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 1rem;
  font-weight: 500;
`;

export const ActionButtons = styled.div`
  margin-top: 1.5rem;
  display: flex;
  justify-content: flex-end;
`;

export const PromotionList = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
`;

export const PromotionCard = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
  padding: 1rem 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.06);
`;

export const CardContent = styled.div`
  h4 {
    margin: 0 0 0.5rem 0;
    font-size: 1.2rem;
  }
  p {
    margin: 0.25rem 0;
    color: #4b5563;
  }
  span {
    font-size: 0.9rem;
    font-weight: bold;
    color: ${({ status }) => status === 'Ativa' ? '#16a34a' : '#ef4444'};
  }
`;

export const CardActions = styled.div``;

export const LoadingText = styled.p`/* ... */`;
export const InfoText = styled.p`/* ... */`;