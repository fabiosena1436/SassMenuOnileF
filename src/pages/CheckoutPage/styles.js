// Arquivo: src/pages/CheckoutPage/styles.js

import styled from 'styled-components';

export const CheckoutWrapper = styled.div`
  display: grid;
  grid-template-columns: 1.5fr 1fr;
  gap: 3rem;
  max-width: 1200px;
  margin: 2rem auto;
  padding: 1rem;

  @media (max-width: 992px) {
    grid-template-columns: 1fr;
  }
`;

export const FormSection = styled.form`
  h2 {
    font-size: 1.5rem;
    margin-top: 2rem;
    margin-bottom: 1rem;
    padding-bottom: 0.5rem;
    border-bottom: 1px solid #e5e7eb;
  }
`;

export const FormGroup = styled.div`
  margin-bottom: 1.25rem;

  label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 500;
    color: #374151;
  }
  
  select {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid #d1d5db;
    border-radius: 6px;
    background-color: white;
    font-size: 1rem;
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

export const OrderSummary = styled.aside`
  background-color: #f9fafb;
  padding: 2rem;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
  position: sticky;
  top: 90px;
  height: fit-content;
`;

export const SummaryTitle = styled.h2`
  font-size: 1.5rem;
  margin-top: 0;
  margin-bottom: 1.5rem;
`;

export const SummaryList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

export const SummaryItem = styled.li`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
  color: #4b5563;
`;

export const TotalRow = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 1.25rem;
  font-weight: bold;
  padding-top: 1rem;
  margin-top: 1rem;
  border-top: 2px solid #e5e7eb;
`;