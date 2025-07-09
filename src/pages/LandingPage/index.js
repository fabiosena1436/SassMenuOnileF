import React, { useState, useRef, useEffect } from 'react'; // Hooks adicionados
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button';
import { PLANS } from '../../utils/plans';
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
import toast from 'react-hot-toast'; // Adicionado para feedback visual

const LandingPage = () => {
  const navigate = useNavigate();

  // --- LÓGICA DO ATALHO SECRETO ---
  const [secretClickCount, setSecretClickCount] = useState(0);
  const clickTimeoutRef = useRef(null);

  // Limpa o timeout se o componente for desmontado
  useEffect(() => {
    return () => {
      if (clickTimeoutRef.current) {
        clearTimeout(clickTimeoutRef.current);
      }
    };
  }, []);

  const handleSecretClick = () => {
    // Limpa o timeout anterior a cada clique
    if (clickTimeoutRef.current) {
      clearTimeout(clickTimeoutRef.current);
    }
  
    const newCount = secretClickCount + 1;
    setSecretClickCount(newCount);
  
    if (newCount >= 7) {
      toast.success('Acesso Super Admin Liberado!');
      // --- CORREÇÃO AQUI ---
      navigate('/super-admin/login'); // Rota corrigida para o login do super admin
      setSecretClickCount(0);
    } else {
      clickTimeoutRef.current = setTimeout(() => {
        setSecretClickCount(0);
      }, 2000);
    }
  };
  // --- FIM DA LÓGICA DO ATALHO SECRETO ---

  return (
    <LandingWrapper>
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

      <Section>
        {/* O gatilho secreto está neste título */}
        <SectionTitle onClick={handleSecretClick}>Veja o Poder em Ação</SectionTitle>
        <Showcase>
          <Mockup src="/images/menu-mockup.png" alt="Exemplo de cardápio online num telemóvel" />
          <Mockup src="/images/admin-mockup.png" alt="Exemplo do painel de administração" />
        </Showcase>
      </Section>

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

      <Section>
        <SectionTitle>Comece Grátis, Cresça com o Pro</SectionTitle>
        <PricingPlan>
          {PLANS.map(plan => (
            <PlanCard key={plan.id} $isFeatured={plan.isFeatured}>
              <PlanTitle>{plan.name}</PlanTitle>
              <PlanPrice>
                {plan.price}
                {plan.priceDetails && <span>{plan.priceDetails}</span>}
              </PlanPrice>
              <PlanFeatureList>
                {plan.features.map(feature => (
                  <li key={feature}><FaCheckCircle color="#22c55e" /> {feature}</li>
                ))}
              </PlanFeatureList>
              <Button 
                $variant={plan.isFeatured ? 'primary' : 'secondary'} 
                style={{ marginTop: 'auto' }}
                onClick={() => navigate('/register')}
              >
                {plan.id === 'basic' ? 'Começar Gratuitamente' : 'Escolher o Pro'}
              </Button>
            </PlanCard>
          ))}
        </PricingPlan>
      </Section>

      <CallToAction>
        <h2>Pronto para começar a vender mais?</h2>
        <Button onClick={() => navigate('/register')} style={{ padding: '1rem 2rem', fontSize: '1.2rem' }}>
          Criar o meu cardápio grátis
        </Button>
      </CallToAction>
    </LandingWrapper>
  );
};

export default LandingPage;