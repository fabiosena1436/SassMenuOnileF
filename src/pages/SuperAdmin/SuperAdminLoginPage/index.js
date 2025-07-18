import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';
import Button from '../../../components/Button';
import {
  LoginPageWrapper,
  BrandingPanel,
  FormPanel,
  LoginForm,
  Logo,
  Title,
  Subtitle,
  FormGroup,
  Input,
  InputIcon,
  ErrorMessage,
  BackLink,
} from './styles';
import { FaUserShield, FaLock } from 'react-icons/fa';

const SuperAdminLoginPage = () => {
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
      navigate('/super-admin');
    } catch (err) {
      setError('Credenciais de Super Admin inválidas.');
      console.error("Erro no login do Super Admin:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <LoginPageWrapper>
      <BrandingPanel>
        <h2>Acesso Super Admin</h2>
        <p>Acesso ao painel de controle geral da plataforma.</p>
      </BrandingPanel>
      <FormPanel>
        <LoginForm onSubmit={handleLogin}>
          <Logo to="/">SassMenu</Logo>
          <Title>Acesso Super Admin</Title>
          <Subtitle>Utilize as suas credenciais para aceder.</Subtitle>
          
          <FormGroup>
            <InputIcon><FaUserShield /></InputIcon>
            <Input
              type="email"
              placeholder="Email de Super Admin"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              disabled={loading}
            />
          </FormGroup>

          {error && <ErrorMessage>{error}</ErrorMessage>}
          
          <Button type="submit" $variant="primary" style={{ width: '100%' }} disabled={loading}>
            {loading ? 'A verificar...' : 'Entrar'}
          </Button>
          
          <BackLink to="/">« Voltar para o site</BackLink>
        </LoginForm>
      </FormPanel>
    </LoginPageWrapper>
  );
};

export default SuperAdminLoginPage;