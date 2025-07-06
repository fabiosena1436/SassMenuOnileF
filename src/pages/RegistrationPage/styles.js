// src/pages/RegistrationPage/styles.js
import styled from 'styled-components';

// Mantivemos todos os seus componentes exportados com os mesmos nomes.
// Apenas substituímos os valores fixos pelas variáveis do tema.

export const RegistrationContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: ${({ theme }) => theme.colors.background};
  padding: 2rem;
`;

export const Title = styled.h1`
  font-size: 2.5rem;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 0.5rem;
  text-align: center;
`;

export const Form = styled.form`
  width: 100%;
  max-width: 450px;
  background: ${({ theme }) => theme.colors.white};
  padding: 2.5rem;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  box-shadow: ${({ theme }) => theme.shadows.md};
  margin-top: 2rem;
`;

export const FormGroup = styled.div`
  margin-bottom: 1.5rem;

  label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.textMedium};
  }
`;

export const Input = styled.input`
  width: 100%;
  padding: 0.75rem 1rem;
  font-size: 1rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  transition: ${({ theme }) => theme.transitions.default};

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.adminPrimary};
    box-shadow: 0 0 0 1px ${({ theme }) => theme.colors.adminPrimary};
  }
`;

export const ErrorMessage = styled.p`
  color: ${({ theme }) => theme.colors.danger};
  background-color: ${({ theme }) => theme.colors.dangerLight};
  padding: 0.75rem;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  margin-bottom: 1.5rem;
  text-align: center;
  font-weight: 500;
`;