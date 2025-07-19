import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const LoginPageWrapper = styled.div`
  display: flex;
  min-height: 100vh;
  width: 100%;
`;

export const BrandingPanel = styled.div`
  flex: 1;
  background: linear-gradient(135deg, #2c3e50, #4ca1af); 
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

export const FormPanel = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.background};
  padding: 2rem;
`;

export const LoginForm = styled.form`
  background-color: ${({ theme }) => theme.colors.white};
  padding: 3rem;
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  box-shadow: ${({ theme }) => theme.shadows.lg};
  width: 100%;
  max-width: 420px;
  display: flex;
  flex-direction: column;

  @media (max-width: 480px) {
    padding: 2rem 1.5rem;
  }
`;

export const Logo = styled(Link)`
  text-align: center;
  font-size: 2rem;
  font-weight: bold;
  color: #34495e;
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
  background-color: ${({ theme }) => theme.colors.background};
  transition: ${({ theme }) => theme.transitions.default};

  &:focus {
    outline: none;
    border-color: #2c3e50;
    background-color: ${({ theme }) => theme.colors.white};
    box-shadow: 0 0 0 3px #2c3e5033;
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