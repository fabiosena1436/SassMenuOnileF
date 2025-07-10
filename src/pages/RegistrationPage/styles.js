import styled from 'styled-components';
import { Link } from 'react-router-dom';

// O wrapper principal que cria o layout de duas colunas
export const RegistrationPageWrapper = styled.div`
  display: flex;
  min-height: 100vh;
  width: 100%;
`;

// Painel da esquerda com a mensagem de marketing
export const BrandingPanel = styled.div`
  flex: 1;
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.primary}, ${({ theme }) => theme.colors.primaryDark});
  color: ${({ theme }) => theme.colors.white};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 3rem;
  text-align: center;

  h2 {
    font-size: 2.5rem;
    font-weight: 700;
    margin-bottom: 1rem;
    line-height: 1.2;
  }

  p {
    font-size: 1.2rem;
    opacity: 0.8;
    max-width: 400px;
  }

  @media (max-width: 900px) {
    display: none;
  }
`;

// Painel da direita com o formulário
export const FormPanel = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.background};
  padding: 2rem;
`;

// O formulário em si
export const Form = styled.form`
  background-color: ${({ theme }) => theme.colors.white};
  padding: 2.5rem;
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  box-shadow: ${({ theme }) => theme.shadows.lg};
  width: 100%;
  max-width: 450px;
  display: flex;
  flex-direction: column;
`;

export const Logo = styled(Link)`
  text-align: center;
  font-size: 2rem;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.primary};
  text-decoration: none;
  margin-bottom: 1rem;
`;

export const Title = styled.h1`
  font-size: 1.8rem;
  color: ${({ theme }) => theme.colors.textDarkest};
  text-align: center;
  font-weight: 700;
  margin: 0;
`;

export const Subtitle = styled.p`
  color: ${({ theme }) => theme.colors.textLight};
  text-align: center;
  margin-bottom: 2.5rem;
`;

export const FormGroup = styled.div`
  margin-bottom: 1.5rem;

  label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.textDark};
  }
`;

export const Input = styled.input`
  width: 100%;
  padding: 0.75rem 1rem;
  font-size: 1rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  transition: ${({ theme }) => theme.transitions.default};
  background-color: ${({ theme }) => theme.colors.backgroundLight};

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    background-color: ${({ theme }) => theme.colors.white};
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.primary}33;
  }
`;

export const ErrorMessage = styled.p`
  color: ${({ theme }) => theme.colors.dangerDark};
  background-color: ${({ theme }) => theme.colors.dangerLight};
  padding: 0.75rem;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  text-align: center;
  font-weight: 500;
  margin-top: 1rem;
  margin-bottom: 0;
`;

export const BackLink = styled(Link)`
  text-align: center;
  margin-top: 1.5rem;
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.textLight};
  text-decoration: none;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
    text-decoration: underline;
  }
`;