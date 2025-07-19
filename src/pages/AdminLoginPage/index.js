import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { auth } from '../../services/firebaseConfig';
import { sendPasswordResetEmail } from 'firebase/auth';
import Button from '../../components/Button';
import toast from 'react-hot-toast';
import PasswordResetModal from '../../components/PasswordResetModal'; // <<< NOVO: Importar o novo modal

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
  ForgotPassword,
  ErrorMessage,
  BackLink,
} from './styles';
import { FaEnvelope, FaLock } from 'react-icons/fa';

const AdminLoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  
  // <<< NOVO: Estado para controlar a visibilidade do modal
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);

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

  // --- LÓGICA ATUALIZADA ---
  // A função agora recebe o e-mail do modal
  const handlePasswordReset = async (resetEmail) => {
    try {
      await sendPasswordResetEmail(auth, resetEmail);
      toast.success(`Um link para redefinir a sua senha foi enviado para ${resetEmail}`);
      setIsResetModalOpen(false); // Fecha o modal após o envio
    } catch (err) {
      console.error("Erro ao enviar e-mail de recuperação:", err);
      toast.error("Não foi possível enviar o e-mail. Verifique se o e-mail está correto.");
    }
  };

  return (
    <> {/* Usamos um fragmento para poder renderizar o modal ao lado do wrapper */}
      <LoginPageWrapper>
        <BrandingPanel>
          <h2>Gestão Inteligente, Vendas Crescentes.</h2>
          <p>A sua plataforma completa para dominar o seu negócio de delivery.</p>
        </BrandingPanel>

        <FormPanel>
          <LoginForm onSubmit={handleLogin}>
            <Logo to="/">SassMenu</Logo>
            <Title>Bem-vindo de volta!</Title>
            <Subtitle>Acesse seu painel para gerenciar suas vendas.</Subtitle>
            
            <FormGroup>
              <InputIcon><FaEnvelope /></InputIcon>
              <Input type="email" placeholder="E-mail" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" disabled={loading} />
            </FormGroup>
            
            <FormGroup>
              <InputIcon><FaLock /></InputIcon>
              <Input type="password" placeholder="Senha" value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="current-password" disabled={loading} />
            </FormGroup>

            {/* O botão agora apenas abre o modal */}
            <ForgotPassword as="button" type="button" onClick={() => setIsResetModalOpen(true)}>
              Esqueceu a senha?
            </ForgotPassword>

            {error && <ErrorMessage>{error}</ErrorMessage>}
            
            <Button type="submit" $variant="primary" style={{ width: '100%' }} disabled={loading}>
              {loading ? 'A entrar...' : 'Entrar no Painel'}
            </Button>
            
            <BackLink to="/">« Voltar para o site</BackLink>
          </LoginForm>
        </FormPanel>
      </LoginPageWrapper>

      {/* --- NOVO: O MODAL É RENDERIZADO AQUI --- */}
      <PasswordResetModal
        isOpen={isResetModalOpen}
        onClose={() => setIsResetModalOpen(false)}
        onSubmit={handlePasswordReset}
      />
    </>
  );
};

export default AdminLoginPage;