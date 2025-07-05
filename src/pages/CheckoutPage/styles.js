// Arquivo: src/pages/CheckoutPage/styles.js

import styled from 'styled-components';

export const CheckoutWrapper = styled.div`
  max-width: 700px;
  margin: 2rem auto;
  padding: 2.5rem;
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1);

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
  color: #4f46e5;
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
  border-bottom: 1px solid #e5e7eb;
`;

export const FormGroup = styled.div`
  margin-bottom: 1rem;

  label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 500;
    font-size: 0.9rem;
    color: #4b5563;
  }
`;

export const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 1rem;
  &:focus {
    outline: none;
    border-color: #4f46e5;
    box-shadow: 0 0 0 1px #4f46e5;
  }
`;

export const PaymentOption = styled.label`
  display: flex;
  align-items: center;
  padding: 1rem;
  border: 2px solid ${({ $isSelected }) => ($isSelected ? '#4f46e5' : '#e5e7eb')};
  border-radius: 8px;
  margin-bottom: 0.75rem;
  cursor: pointer;
  background-color: ${({ $isSelected }) => ($isSelected ? '#eef2ff' : 'transparent')};

  input[type="radio"] {
    margin-right: 0.75rem;
  }
`;

export const ConditionalField = styled.div`
  padding: 1rem;
  margin-left: 1.5rem;
  margin-bottom: 0.75rem;
  border-left: 3px solid #e5e7eb;
`;