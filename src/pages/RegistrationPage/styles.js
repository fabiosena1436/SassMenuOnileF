// Ficheiro: src/pages/RegistrationPage/styles.js

import styled from 'styled-components';

export const RegistrationPageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f4f4f4;
`;

export const RegistrationForm = styled.form`
  background: white;
  padding: 40px;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
`;

export const Title = styled.h1`
  text-align: center;
  margin-bottom: 2rem;
  color: #333;
`;

export const Input = styled.input`
  width: 100%;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  box-sizing: border-box;
  margin-bottom: 1rem;
`;

export const ErrorMessage = styled.p`
  color: #d93025;
  font-size: 14px;
  text-align: center;
  margin-top: -0.5rem;
  margin-bottom: 1rem;
`;