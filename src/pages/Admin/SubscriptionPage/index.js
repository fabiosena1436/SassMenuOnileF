// src/pages/Admin/SubscriptionPage/index.js
import React, { useState, useMemo } from 'react';
import { getFunctions, httpsCallable } from 'firebase/functions';
import { useAuth } from '../../../contexts/AuthContext';
import Button from '../../../components/Button';
import { PLANS } from '../../../utils/plans'; // Caminho corrigido para a pasta utils
import toast from 'react-hot-toast';
import { FaCheckCircle } from 'react-icons/fa';

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


const SubscriptionPage = () => {
  const [loading, setLoading] = useState(false);
  const { tenant } = useAuth();

  const currentPlan = useMemo(() => {
    return PLANS.find(p => p.id === tenant?.plan);
  }, [tenant]);

  const handleSubscribe = async (planId) => {
    const selectedPlan = PLANS.find(p => p.id === planId);
    if (!selectedPlan || !selectedPlan.stripePriceId) {
        toast.error('Plano inválido para assinatura.');
        return;
    };

    setLoading(true);
    toast.loading('A preparar o seu checkout seguro...');
    try {
      const functions = getFunctions();
      const createSubscription = httpsCallable(functions, 'createSubscription');
      // Passa o ID de preço do Stripe para a função de back-end
      const result = await createSubscription({ stripePriceId: selectedPlan.stripePriceId });
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
              <PlanPrice>
                {plan.price}
                {plan.priceDetails && <span>{plan.priceDetails}</span>}
              </PlanPrice>
              
              <PlanFeatures>
                {plan.features.map((feature) => (
                  <FeatureItem key={feature}>
                    <FaCheckCircle /> {feature}
                  </FeatureItem>
                ))}
              </PlanFeatures>

              {tenant.plan === plan.id ? (
                <Button disabled style={{ marginTop: 'auto' }}>Seu Plano Atual</Button>
              ) : plan.id === 'pro' ? (
                <Button 
                  $variant="primary" 
                  onClick={() => handleSubscribe(plan.id)} 
                  style={{ marginTop: 'auto' }}
                >
                  Fazer Upgrade para o Pro
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