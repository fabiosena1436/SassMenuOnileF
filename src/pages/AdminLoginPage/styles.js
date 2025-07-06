// src/pages/AdminLoginPage/styles.js
import styled from 'styled-components';

export const LoginPageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh; 
  padding: 20px;
  background-color: ${({ theme }) => theme.colors.primaryLighter}; 
`;

export const LoginForm = styled.form`
  background-color: ${({ theme }) => theme.colors.white};
  padding: 40px;
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  width: 100%;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const Title = styled.h1`
  color: ${({ theme }) => theme.colors.primary};
  text-align: center;
  margin-bottom: 10px;
`;

export const FormGroup = styled.div`
  label {
    display: block;
    margin-bottom: 8px;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.textMedium};
  }
  
  input {
    width: 100%;
    padding: 12px;
    border: 1px solid ${({ theme }) => theme.colors.borderMedium};
    border-radius: ${({ theme }) => theme.borderRadius.md};
    font-size: 1em;
    box-sizing: border-box;
    
    &:focus {
      border-color: ${({ theme }) => theme.colors.primary};
      outline: none;
      box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.primary}33; /* Cor primária com 20% de opacidade */
    }
  }
`;

export const ErrorMessage = styled.p`
  color: ${({ theme }) => theme.colors.danger};
  font-size: 0.9em;
  text-align: center;
  margin-top: -10px;
  margin-bottom: 10px;
`;

export const Input = styled.input`
  width: 100%;
  padding: 12px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  font-size: 16px;
  box-sizing: border-box;

  &:focus {
    border-color: ${({ theme }) => theme.colors.highlight};
    outline: none;
  }
`;