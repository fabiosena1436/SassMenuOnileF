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
  const { login } = useAuth(); // A mesma função de login pode ser usada, o back-end validará a role

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    if (!email || !password) {
      setError('Por favor, preencha todos os campos.');
      return;
    }
    setLoading(true);
    try {
      // Tenta fazer o login. A validação de 'superadmin' deve ocorrer no ProtectedRoute/SuperAdminRoute
      await login(email, password);
      navigate('/super-admin'); // Redireciona para o dashboard do Super Admin
    } catch (err) {
      setError('Credenciais de Super Admin inválidas.');
      console.error("Erro no login do Super Admin:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <LoginPageWrapper>
      {/* Painel de Branding específico para Super Admin */}
      <BrandingPanel>
        <h2>Controlo Total</h2>
        <p>Acesso ao painel de controlo geral da plataforma.</p>
      </BrandingPanel>

      {/* Painel de Formulário */}
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