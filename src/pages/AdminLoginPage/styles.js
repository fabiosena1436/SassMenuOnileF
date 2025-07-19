import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const LoginPageWrapper = styled.div`
  display: flex;
  min-height: 100vh;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const BrandingPanel = styled.div`
  flex: 1;
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.primaryDark}, ${({ theme }) => theme.colors.primary});
  color: white;
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
    opacity: 0.9;
    max-width: 400px;
  }

  @media (max-width: 900px) {
    display: none;
  }
`;

export const FormPanel = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
`;

export const LoginForm = styled.form`
  background-color: ${({ theme }) => theme.colors.white};
  padding: 3rem;
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  box-shadow: ${({ theme }) => theme.shadows.lg};
  width: 100%;
  max-width: 450px;
  display: flex;
  flex-direction: column;

  @media (max-width: 480px) {
    padding: 2rem 1.5rem;
    box-shadow: none;
    border-radius: 0;
  }
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
  color: ${({ theme }) => theme.colors.textDarkest};
  text-align: center;
  font-size: 1.8rem;
  font-weight: 700;
  margin: 0;
`;

export const Subtitle = styled.p`
  color: ${({ theme }) => theme.colors.textLight};
  text-align: center;
  margin-bottom: 2.5rem;
`;

export const FormGroup = styled.div`
  position: relative;
  margin-bottom: 1.5rem;
`;

export const InputIcon = styled.div`
  position: absolute;
  top: 50%;
  left: 15px;
  transform: translateY(-50%);
  color: ${({ theme }) => theme.colors.textSubtle};
`;

export const Input = styled.input`
  width: 100%;
  padding: 1rem 1rem 1rem 3rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  font-size: 1rem;
  background-color: #f8f9fa;
  transition: ${({ theme }) => theme.transitions.default};

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    background-color: ${({ theme }) => theme.colors.white};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.primary}33;
  }
`;

export const ForgotPassword = styled.button`
  // Alterado de 'a' para 'button' para melhor semântica
  display: block;
  text-align: right;
  margin-top: -1rem;
  margin-bottom: 1.5rem;
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.primary};
  text-decoration: none;
  background: none;
  border: none;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

export const ErrorMessage = styled.p`
  color: ${({ theme }) => theme.colors.dangerDark};
  background-color: ${({ theme }) => theme.colors.dangerLight};
  padding: 0.75rem;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  text-align: center;
  font-weight: 500;
  margin-bottom: 1.5rem;
`;

export const BackLink = styled(Link)`
  text-align: center;
  margin-top: 2rem;
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.textLight};
  text-decoration: none;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
    text-decoration: underline;
  }
`;

// Estilos de Separator, SocialLoginContainer e SocialButton foram removidos.