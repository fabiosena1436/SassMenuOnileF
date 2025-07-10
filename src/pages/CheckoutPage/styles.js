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
    margin-bottom: 3rem;
    padding: 1.5rem;
    border-radius: 0;
    box-shadow: none;
    min-height: 100vh;
  }
`;

export const Title = styled.h1`
  text-align: center;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: 2.5rem;
  font-size: 2rem;

  @media (max-width: 480px) {
    font-size: 1.5rem;
    margin-bottom: 1.5rem;
  }
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
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.primaryLightest};
  }
`;

export const AddressGrid = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 1rem;

  @media (max-width: 576px) {
    grid-template-columns: 1fr;
  }
`;

export const PaymentOption = styled.label`
  display: flex;
  align-items: center;
  padding: 1rem;
  border: 2px solid ${({ $isSelected, theme }) => ($isSelected ? theme.colors.primary : theme.colors.borderLight)};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  margin-bottom: 0.75rem;
  cursor: pointer;
  background-color: ${({ $isSelected, theme }) => ($isSelected ? theme.colors.primaryLightest : 'transparent')};
  transition: all 0.2s ease-in-out;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
  }

  input[type="radio"] {
    margin-right: 0.75rem;
  }
`;

export const ConditionalField = styled.div`
  padding: 1rem 1rem 0.5rem 1.5rem;
  margin: -0.5rem 0 0.75rem 1.5rem;
  border-left: 3px solid ${({ theme }) => theme.colors.borderLight};
`;

export const PixInstructions = styled.div`
  padding: 1rem 1rem 1rem 1.5rem;
  margin: -0.5rem 0 1rem 1.5rem;
  border-left: 3px solid ${({ theme }) => theme.colors.primary};
  background-color: ${({ theme }) => theme.colors.primaryLightest};
  border-radius: 0 ${({ theme }) => theme.borderRadius.md} ${({ theme }) => theme.borderRadius.md} 0;

  p {
    margin: 0 0 0.5rem 0;
    font-size: 0.9rem;
    color: ${({ theme }) => theme.colors.textMedium};
  }

  strong {
    font-size: 1.1rem;
    color: ${({ theme }) => theme.colors.textDarkest};
    word-break: break-all;
  }

  button {
    margin-top: 0.75rem;
  }
`;

export const SummaryLine = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.textMedium};
  margin-bottom: 0.5rem;
`;

export const GrandTotalLine = styled(SummaryLine)`
  font-weight: bold;
  font-size: 1.2rem;
  color: ${({ theme }) => theme.colors.textDarkest};
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
`;

export const PlaceOrderButton = styled.button`
  width: 100%;
  padding: 1rem;
  font-size: 1.1rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.white};
  background-color: ${({ theme }) => theme.colors.success};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  cursor: pointer;
  margin-top: 1.5rem;
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.successDark};
  }

  &:disabled {
    background-color: ${({ theme }) => theme.colors.neutral};
    cursor: not-allowed;
  }
`;