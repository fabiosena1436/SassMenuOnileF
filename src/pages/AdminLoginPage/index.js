// Arquivo: src/pages/AdminLoginPage/index.js (VERSÃO FINAL DE DEBUG)

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import Button from '../../components/Button';
import {
  LoginPageWrapper,
  LoginForm,
  Title,
  ErrorMessage,
  FormGroup,
  Input,
} from './styles';

const AdminLoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    if (!email || !password) {
      setError('Por favor, preencha todos os campos.');
      return;
    }
    try {
      await login(email, password);
      
      // NOSSA ÚLTIMA CÂMERA DE SEGURANÇA
      console.log("SUCESSO TOTAL! A função 'login' terminou. Agora tentando navegar para /admin...");

      navigate('/admin');

    } catch (err) {
      console.error("DEBUG: Erro capturado no 'catch'!", err);
      setError('Ocorreu um erro inesperado.');
    }
  };

  return (
    <LoginPageWrapper>
      <LoginForm onSubmit={handleLogin}>
        <Title>Login do Lojista</Title>
        <FormGroup>
          <Input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
          />
        </FormGroup>
        <FormGroup>
          <Input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
          />
        </FormGroup>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <Button type="submit" style={{ width: '100%' }}>Entrar</Button>
      </LoginForm>
    </LoginPageWrapper>
  );
};

export default AdminLoginPage;