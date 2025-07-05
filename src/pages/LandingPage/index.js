// Arquivo: src/pages/LandingPage/index.js

import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button';
import {
  LandingWrapper,
  Header,
  Title,
  Subtitle,
  Features,
  FeatureCard,
  CallToAction
} from './styles';
import { FaRocket, FaStore, FaMobileAlt } from 'react-icons/fa';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <LandingWrapper>
      <Header>
        <Title>Transforme o seu Negócio com um Cardápio Online Profissional</Title>
        <Subtitle>
          Crie um cardápio digital incrível em minutos. Aumente as suas vendas e facilite a vida dos seus clientes.
        </Subtitle>
        <Button onClick={() => navigate('/register')} style={{ marginTop: '2rem' }}>
          Criar o Meu Cardápio Agora
        </Button>
      </Header>

      <Features>
        <FeatureCard>
          <FaRocket size={40} />
          <h3>Rápido e Fácil</h3>
          <p>Configure a sua loja e adicione os seus produtos em poucos minutos, sem complicações.</p>
        </FeatureCard>
        <FeatureCard>
          <FaStore size={40} />
          <h3>Gestão Completa</h3>
          <p>Controle os seus produtos, categorias e promoções a partir de um painel de administração simples e intuitivo.</p>
        </FeatureCard>
        <FeatureCard>
          <FaMobileAlt size={40} />
          <h3>Otimizado para Telemóveis</h3>
          <p>O seu cardápio terá uma aparência perfeita em qualquer dispositivo, facilitando os pedidos dos seus clientes.</p>
        </FeatureCard>
      </Features>

      <CallToAction>
        <h2>Pronto para começar?</h2>
        <Button onClick={() => navigate('/register')}>
          Quero o meu cardápio online
        </Button>
      </CallToAction>
    </LandingWrapper>
  );
};

export default LandingPage;