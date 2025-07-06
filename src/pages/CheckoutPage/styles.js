// src/pages/CheckoutPage/styles.js
import styled from 'styled-components';

export const CheckoutWrapper = styled.div`
  max-width: 700px;
  margin: 2rem auto;
  padding: 2.5rem;
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  box-shadow: ${({ theme }) => theme.shadows.lg};

  @media (max-width: 768px) {
    margin: 0;
    padding: 1.5rem;
    border-radius: 0;
    box-shadow: none;
    min-height: 100vh;
  }
`;

export const Title = styled.h1`
  text-align: center;
  color: ${({ theme }) => theme.colors.adminPrimary};
  margin-bottom: 2.5rem;
`;

export const Section = styled.section`
  margin-bottom: 2rem;
`;

export const SectionTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderLight};
`;

export const FormGroup = styled.div`
  margin-bottom: 1rem;

  label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 500;
    font-size: 0.9rem;
    color: ${({ theme }) => theme.colors.textMedium};
  }
`;

export const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: 1rem;
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.adminPrimary};
    box-shadow: 0 0 0 1px ${({ theme }) => theme.colors.adminPrimary};
  }
`;

export const PaymentOption = styled.label`
  display: flex;
  align-items: center;
  padding: 1rem;
  border: 2px solid ${({ $isSelected, theme }) => ($isSelected ? theme.colors.adminPrimary : theme.colors.borderLight)};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  margin-bottom: 0.75rem;
  cursor: pointer;
  background-color: ${({ $isSelected, theme }) => ($isSelected ? theme.colors.primaryLightest : 'transparent')};

  input[type="radio"] {
    margin-right: 0.75rem;
  }
`;

export const ConditionalField = styled.div`
  padding: 1rem;
  margin-left: 1.5rem;
  margin-bottom: 0.75rem;
  border-left: 3px solid ${({ theme }) => theme.colors.borderLight};
`;