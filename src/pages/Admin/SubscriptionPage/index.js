import React, { useState, useMemo } from 'react';
import { getFunctions, httpsCallable } from 'firebase/functions';
import { useAuth } from '../../../contexts/AuthContext';
import Button from '../../../components/Button';
import { FaCheckCircle } from 'react-icons/fa';
import toast from 'react-hot-toast';

import {
  PageWrapper,
  Header,
  SectionTitle,
  Subtitle,
  SubscriptionStatus,
  PlansContainer,
  PlanCard,
  PlanTitle,
  PlanDescription,
  PlanPrice,
  PlanFeatures,
  FeatureItem,
  FeaturedBadge,
  LoadingText
} from './styles';

// 1. DADOS CENTRALIZADOS: Toda a informação dos planos vive aqui.
const PLANS = [
  {
    id: 'basic',
    name: 'Básico',
    price: 'Grátis',
    priceDetails: 'para sempre',
    description: 'Ideal para começar e validar o seu negócio online.',
    features: [
      'Cardápio Online Responsivo',
      'Até 10 produtos cadastrados',
      'Pedidos via WhatsApp',
      'Painel de Gestão Simplificado'
    ],
    isFeatured: false,
  },
  {
    id: 'pro',
    name: 'Pro',
    price: 'R$ 29,90',
    priceDetails: '/mês',
    description: 'A solução completa para profissionalizar e escalar as suas vendas.',
    features: [
      'Tudo do plano Básico',
      'Produtos Ilimitados',
      'Gestão de Promoções',
      'Relatórios de Vendas',
      'Suporte Prioritário'
    ],
    isFeatured: true,
  }
];

const SubscriptionPage = () => {
  const [loading, setLoading] = useState(false);
  const { tenant } = useAuth();

  // Memoiza o plano atual para evitar recálculos desnecessários
  const currentPlan = useMemo(() => {
    return PLANS.find(p => p.id === tenant?.plan);
  }, [tenant]);

  const handleSubscribe = async (planId) => {
    setLoading(true);
    toast.loading('A preparar o seu checkout seguro...');
    try {
      const functions = getFunctions();
      const createSubscription = httpsCallable(functions, 'createSubscription');
      const result = await createSubscription({ planId });
      const { checkoutUrl } = result.data;
      window.location.href = checkoutUrl;
    } catch (error) {
      console.error("Erro ao criar a assinatura:", error);
      toast.dismiss();
      toast.error("Ocorreu um erro ao iniciar a sua assinatura.");
      setLoading(false);
    }
  };

  if (!tenant || !currentPlan) {
    return <PageWrapper><LoadingText>A carregar informações do seu plano...</LoadingText></PageWrapper>;
  }

  return (
    <PageWrapper>
      <Header>
        <SectionTitle>Assinatura e Planos</SectionTitle>
        <Subtitle>Faça o upgrade para desbloquear todo o potencial da sua loja.</Subtitle>
      </Header>
      
      {/* 2. STATUS DA ASSINATURA */}
      <SubscriptionStatus>
        Você está no plano <strong>{currentPlan.name}</strong>. Sua assinatura está ativa.
      </SubscriptionStatus>

      {loading ? (
        <LoadingText>A redirecionar para o checkout...</LoadingText>
      ) : (
        <PlansContainer>
          {PLANS.map((plan) => (
            <PlanCard key={plan.id} $isFeatured={plan.isFeatured}>
              {plan.isFeatured && <FeaturedBadge>Recomendado</FeaturedBadge>}
              <PlanTitle>{plan.name}</PlanTitle>
              <PlanDescription>{plan.description}</PlanDescription>
              <PlanPrice>{plan.price}<span>{plan.priceDetails}</span></PlanPrice>
              
              <PlanFeatures>
                {plan.features.map((feature) => (
                  <FeatureItem key={feature}>
                    <FaCheckCircle /> {feature}
                  </FeatureItem>
                ))}
              </PlanFeatures>

              {/* 3. LÓGICA DE BOTÕES SIMPLIFICADA */}
              {tenant.plan === plan.id ? (
                <Button disabled style={{ marginTop: 'auto' }}>Seu Plano Atual</Button>
              ) : plan.id === 'pro' ? (
                <Button 
                  $variant="primary" 
                  onClick={() => handleSubscribe('plano_pro_mensal')} 
                  style={{ marginTop: 'auto' }}
                >
                  Fazer Upgrade
                </Button>
              ) : (
                <Button $variant="secondary" style={{ marginTop: 'auto' }}>
                  Fazer Downgrade
                </Button>
              )}
            </PlanCard>
          ))}
        </PlansContainer>
      )}
    </PageWrapper>
  );
};

export default SubscriptionPage;