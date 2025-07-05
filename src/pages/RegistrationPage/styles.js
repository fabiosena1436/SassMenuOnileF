// Arquivo: src/pages/RegistrationPage/styles.js

import styled from 'styled-components';

export const RegistrationContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: #f7fafc;
  padding: 2rem;
`;

export const Title = styled.h1`
  font-size: 2.5rem;
  color: #2d3748;
  margin-bottom: 0.5rem;
  text-align: center;
`;

export const Form = styled.form`
  width: 100%;
  max-width: 450px;
  background: white;
  padding: 2.5rem;
  border-radius: 8px;
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  margin-top: 2rem;
`;

export const FormGroup = styled.div`
  margin-bottom: 1.5rem;

  label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 600;
    color: #4a5568;
  }
`;

export const Input = styled.input`
  width: 100%;
  padding: 0.75rem 1rem;
  font-size: 1rem;
  border: 1px solid #cbd5e0;
  border-radius: 6px;
  transition: border-color 0.2s, box-shadow 0.2s;

  &:focus {
    outline: none;
    border-color: #4f46e5;
    box-shadow: 0 0 0 1px #4f46e5;
  }
`;

export const ErrorMessage = styled.p`
  color: #e53e3e;
  background-color: #fed7d7;
  padding: 0.75rem;
  border-radius: 6px;
  margin-bottom: 1.5rem;
  text-align: center;
  font-weight: 500;
`;