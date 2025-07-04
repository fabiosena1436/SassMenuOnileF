// Ficheiro: src/pages/RegistrationPage/index.js

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../services/firebaseConfig';
import { useAuth } from '../../contexts/AuthContext';
import { slugify } from '../../utils/slugify';
import Button from '../../components/Button';
import {
  RegistrationPageWrapper,
  RegistrationForm,
  Title,
  Input,
  ErrorMessage,
} from './styles';

const RegistrationPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [storeName, setStoreName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleRegistration = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!email || !password || !storeName) {
      setError('Por favor, preencha todos os campos.');
      return;
    }
    
    setLoading(true);
    const auth = getAuth();

    try {
      // Passo 1: Criar o utilizador no Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const newUser = userCredential.user;

      // Passo 2: Criar o documento 'tenant' no Firestore
      const storeSlug = slugify(storeName);
      await addDoc(collection(db, 'tenants'), {
        ownerId: newUser.uid,
        storeName: storeName,
        slug: storeSlug,
        plan: 'basic', // ou 'free_trial'
        status: 'active',
        createdAt: serverTimestamp(),
      });

      // Passo 3: Fazer login com o novo utilizador para criar a sessão
      await login(email, password);
      
      // Passo 4: Redirecionar para o painel de administração
      navigate('/admin');

    } catch (err) {
      console.error("Erro no registo:", err.code);
      if (err.code === 'auth/email-already-in-use') {
        setError('Este email já está a ser utilizado.');
      } else if (err.code === 'auth/weak-password') {
        setError('A sua senha deve ter pelo menos 6 caracteres.');
      } else {
        setError('Ocorreu um erro ao criar a sua conta.');
      }
      setLoading(false);
    }
  };

  return (
    <RegistrationPageWrapper>
      <RegistrationForm onSubmit={handleRegistration}>
        <Title>Crie a sua Loja</Title>
        <Input
          type="text"
          placeholder="Nome da sua loja"
          value={storeName}
          onChange={(e) => setStoreName(e.target.value)}
        />
        <Input
          type="email"
          placeholder="Seu melhor email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
        />
        <Input
          type="password"
          placeholder="Crie uma senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="new-password"
        />
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <Button type="submit" disabled={loading} style={{ width: '100%' }}>
          {loading ? 'A criar...' : 'Criar a Minha Loja'}
        </Button>
      </RegistrationForm>
    </RegistrationPageWrapper>
  );
};

export default RegistrationPage;