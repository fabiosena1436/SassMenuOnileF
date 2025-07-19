import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '../../services/firebaseConfig';
import { slugify } from '../../utils/slugify';
import toast from 'react-hot-toast';
import Button from '../../components/Button';
import {
  RegistrationPageWrapper,
  BrandingPanel,
  FormPanel,
  Form,
  Logo,
  Title,
  Subtitle,
  FormGroup,
  Input,
  ErrorMessage,
  BackLink,
} from './styles';

const RegistrationPage = () => {
  const [formData, setFormData] = useState({
    storeName: '',
    email: '',
    password: '',
    confirmPassword: '', // <<< NOVO CAMPO NO ESTADO
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // --- NOVA VALIDAÇÃO ---
    if (formData.password !== formData.confirmPassword) {
      setError("As senhas não coincidem. Por favor, tente novamente.");
      return;
    }
    // --- FIM DA NOVA VALIDAÇÃO ---

    if (!formData.storeName || !formData.email || !formData.password) {
      setError("Todos os campos são obrigatórios.");
      return;
    }
    setLoading(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      const user = userCredential.user;

      const userDocRef = doc(db, 'users', user.uid);
      await setDoc(userDocRef, {
        email: user.email,
        uid: user.uid,
        role: 'lojista',
        createdAt: serverTimestamp(),
      });

      const storeSlug = slugify(formData.storeName);
      const tenantDocRef = doc(db, 'tenants', user.uid);
      await setDoc(tenantDocRef, {
        ownerId: user.uid,
        storeName: formData.storeName,
        slug: storeSlug,
        plan: 'basic',
        isStoreOpen: true,
        deliveryFee: 5.00,
        createdAt: serverTimestamp(),
      });

      toast.success('Loja criada com sucesso! Bem-vindo(a)!');
      navigate('/admin');

    } catch (err) {
      console.error("Erro no registo:", err.code, err.message);
      if (err.code === 'auth/email-already-in-use') {
        setError("Este email já está a ser utilizado.");
      } else if (err.code === 'auth/weak-password') {
        setError("A sua password deve ter pelo menos 6 caracteres.");
      } else {
        setError("Ocorreu um erro ao criar a sua conta. Tente novamente.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <RegistrationPageWrapper>
      <BrandingPanel>
        <h2>A sua vitrine digital. Pronta em minutos.</h2>
        <p>Junte-se a centenas de lojistas que já transformaram a sua operação com um cardápio online rápido e eficiente.</p>
      </BrandingPanel>

      <FormPanel>
        <Form onSubmit={handleSubmit}>
          <Logo to="/">SassMenu</Logo>
          <Title>Crie o seu Cardápio Online</Title>
          <Subtitle>Comece a vender em minutos.</Subtitle>
          
          <FormGroup>
            <label htmlFor="storeName">Nome da sua Loja</label>
            <Input type="text" name="storeName" id="storeName" onChange={handleChange} required />
          </FormGroup>
          <FormGroup>
            <label htmlFor="email">O seu Email de Acesso</label>
            <Input type="email" name="email" id="email" onChange={handleChange} required />
          </FormGroup>
          <FormGroup>
            <label htmlFor="password">Crie uma Password</label>
            <Input type="password" name="password" id="password" onChange={handleChange} required />
          </FormGroup>
          
          {/* --- NOVO CAMPO DE CONFIRMAÇÃO --- */}
          <FormGroup>
            <label htmlFor="confirmPassword">Confirme a sua Password</label>
            <Input type="password" name="confirmPassword" id="confirmPassword" onChange={handleChange} required />
          </FormGroup>
          {/* --- FIM DO NOVO CAMPO --- */}
          
          {error && <ErrorMessage>{error}</ErrorMessage>}
          
          <Button type="submit" disabled={loading} style={{ width: '100%', marginTop: '1rem' }}>
            {loading ? 'A criar...' : 'Criar a Minha Loja Grátis'}
          </Button>
          
          <BackLink to="/admin/login">Já tenho uma conta</BackLink>
        </Form>
      </FormPanel>
    </RegistrationPageWrapper>
  );
};

export default RegistrationPage;