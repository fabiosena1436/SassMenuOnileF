// src/pages/LandingPage/index.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button';
import {
  LandingWrapper,
  Header,
  Title,
  Subtitle,
  ButtonGroup,
  Section,
  SectionTitle,
  Showcase,
  Mockup,
  Features,
  FeatureCard,
  PricingPlan,
  PlanCard,
  PlanTitle,
  PlanPrice,
  PlanFeatureList,
  CallToAction,
} from './styles';
import { FaRocket, FaStore, FaMobileAlt, FaCheckCircle } from 'react-icons/fa';

// Dados dos planos - pode alterar isto facilmente no futuro
const plans = [
  {
    name: 'Básico',
    price: '9,90',
    features: [
      'Cardápio Online Ilimitado',
      'Pedidos via WhatsApp',
      'Painel de Gestão Simples',
      'QR Code para Mesas',
    ],
    isFeatured: false,
  },
  {
    name: 'Profissional',
    price: '29,90',
    features: [
      'Tudo do plano Básico',
      'Domínio Personalizado',
      'Relatórios de Vendas',
      'Suporte Prioritário',
    ],
    isFeatured: true,
  },
  {
    name: 'Premium',
    price: '49,90',
    features: [
      'Tudo do plano Profissional',
      'Integração com iFood/Uber Eats',
      'Gestão de Entregadores',
      'Marketing por E-mail',
    ],
    isFeatured: false,
  },
];


const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <LandingWrapper>
      {/* --- CABEÇALHO (HERO SECTION) --- */}
      <Header>
        <Title>Transforme o seu Negócio com um Cardápio Online Profissional</Title>
        <Subtitle>
          Crie um cardápio digital incrível em minutos. Aumente as suas vendas e facilite a vida dos seus clientes.
        </Subtitle>
        <ButtonGroup>
          <Button $variant="primary" onClick={() => navigate('/register')} style={{ padding: '1rem 2rem', fontSize: '1.1rem' }}>
            Criar o Meu Cardápio Agora
          </Button>
          <Button $variant="secondary" onClick={() => navigate('/admin/login')} style={{ padding: '1rem 2rem', fontSize: '1.1rem' }}>
            Já tenho conta
          </Button>
        </ButtonGroup>
      </Header>

      {/* --- SECÇÃO DE PROVA VISUAL --- */}
      <Section>
        <SectionTitle>Veja o Poder em Ação</SectionTitle>
        <Showcase>
          <Mockup src="/images/menu-mockup.png" alt="Exemplo de cardápio online num telemóvel" />
          <Mockup src="/images/admin-mockup.png" alt="Exemplo do painel de administração" />
        </Showcase>
       
      </Section>


      {/* --- SECÇÃO DE FUNCIONALIDADES --- */}
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

      {/* --- SECÇÃO DE PREÇOS --- */}
      <Section>
        <SectionTitle>Planos Transparentes para o seu Sucesso</SectionTitle>
        <PricingPlan>
          {plans.map(plan => (
            <PlanCard key={plan.name} $isFeatured={plan.isFeatured}>
              <PlanTitle>{plan.name}</PlanTitle>
              <PlanPrice>R$ {plan.price}<span>/mês</span></PlanPrice>
              <PlanFeatureList>
                {plan.features.map(feature => (
                  <li key={feature}><FaCheckCircle color="#22c55e" /> {feature}</li>
                ))}
              </PlanFeatureList>
              <Button $variant={plan.isFeatured ? 'primary' : 'secondary'} style={{ marginTop: 'auto' }}>
                Começar com o Plano {plan.name}
              </Button>
            </PlanCard>
          ))}
        </PricingPlan>
      </Section>

      {/* --- CHAMADA PARA AÇÃO FINAL --- */}
      <CallToAction>
        <h2>Pronto para começar a vender mais?</h2>
        <Button onClick={() => navigate('/register')} style={{ padding: '1rem 2rem', fontSize: '1.2rem' }}>
          Quero o meu cardápio online grátis
        </Button>
      </CallToAction>
    </LandingWrapper>
  );
};

export default LandingPage;