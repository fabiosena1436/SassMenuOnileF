// src/pages/AdminLoginPage/index.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importando o Link
import { useAuth } from '../../contexts/AuthContext';
import Button from '../../components/Button';
import {
  LoginPageWrapper,
  BrandingPanel,
  FormPanel,
  LoginForm,
  Logo, // Novo
  Title,
  Subtitle,
  FormGroup,
  Input,
  InputIcon,
  ForgotPassword,
  ErrorMessage,
  Separator,
  SocialLoginContainer,
  SocialButton,
  BackLink, // Novo
} from './styles';
import { FaEnvelope, FaLock, FaGoogle, FaFacebook } from 'react-icons/fa';

const AdminLoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    if (!email || !password) {
      setError('Por favor, preencha todos os campos.');
      return;
    }
    setLoading(true);
    try {
      await login(email, password);
      navigate('/admin');
    } catch (err) {
      setError('E-mail ou senha inválidos. Tente novamente.');
      console.error("Erro no login:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <LoginPageWrapper>
      {/* --- PAINEL ESQUERDO (BRANDING) --- */}
      <BrandingPanel>
        <h2>Gestão Inteligente, Vendas Crescentes.</h2>
        <p>A sua plataforma completa para dominar o seu negócio de delivery.</p>
      </BrandingPanel>

      {/* --- PAINEL DIREITO (FORMULÁRIO) --- */}
      <FormPanel>
        <LoginForm onSubmit={handleLogin}>
          {/* LOGO CLICÁVEL ADICIONADO AQUI */}
          <Logo to="/">SassMenu</Logo>
          
          <Title>Bem-vindo de volta!</Title>
          <Subtitle>Acesse seu painel para gerenciar suas vendas.</Subtitle>
          
          <FormGroup>
            <InputIcon><FaEnvelope /></InputIcon>
            <Input
              type="email"
              placeholder="E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              disabled={loading}
            />
          </FormGroup>
          
          <FormGroup>
            <InputIcon><FaLock /></InputIcon>
            <Input
              type="password"
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              disabled={loading}
            />
          </FormGroup>

          <ForgotPassword href="#">Esqueceu a senha?</ForgotPassword>

          {error && <ErrorMessage>{error}</ErrorMessage>}
          
          <Button type="submit" $variant="primary" style={{ width: '100%' }} disabled={loading}>
            {loading ? 'A entrar...' : 'Entrar no Painel'}
          </Button>

          <Separator>ou entre com</Separator>

          <SocialLoginContainer>
            <SocialButton $variant="google" type="button">
              <FaGoogle /> Google
            </SocialButton>
            <SocialButton $variant="facebook" type="button">
              <FaFacebook /> Facebook
            </SocialButton>
          </SocialLoginContainer>
          
          {/* LINK DE "VOLTAR" ADICIONADO AQUI */}
          <BackLink to="/">« Voltar para o site</BackLink>

        </LoginForm>
      </FormPanel>
    </LoginPageWrapper>
  );
};

export default AdminLoginPage;