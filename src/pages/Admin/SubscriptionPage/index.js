// Ficheiro: src/pages/Admin/SubscriptionPage/index.js

import React, { useState, useMemo } from 'react';
import { getFunctions, httpsCallable } from 'firebase/functions';
import { useAuth } from '../../../contexts/AuthContext';
import Button from '../../../components/Button';
import { PLANS } from '../../../utils/plans';
import toast from 'react-hot-toast';
import { FaCheckCircle } from 'react-icons/fa';

import {
  PageWrapper, Header, SectionTitle, Subtitle, SubscriptionStatus, PlansContainer,
  PlanCard, PlanTitle, PlanDescription, PlanPrice, PlanFeatures, FeatureItem,
  FeaturedBadge, LoadingText
} from './styles';

const SubscriptionPage = () => {
  const [loadingAction, setLoadingAction] = useState(null); // 'subscribe' ou 'cancel'
  const { tenant, loading: authLoading } = useAuth();

  const currentPlan = useMemo(() => {
    return PLANS.find(p => p.id === tenant?.plan);
  }, [tenant]);

  // --- LÓGICA PARA FAZER O UPGRADE ---
  const handleSubscribe = async () => {
    setLoadingAction('subscribe');
    toast.loading('A preparar o seu checkout seguro...');
    
    try {
      const functions = getFunctions();
      const createSubscription = httpsCallable(functions, 'createSubscription');
      const result = await createSubscription();
      
      const { init_point } = result.data;
      if (init_point) {
        window.location.href = init_point; // Redireciona para o checkout do Mercado Pago
      }
    } catch (error) {
      console.error("Erro ao criar a assinatura:", error);
      toast.dismiss();
      toast.error("Ocorreu um erro ao iniciar a sua assinatura.");
      setLoadingAction(null);
    }
  };

  // --- LÓGICA PARA CANCELAR A ASSINATURA ---
  const handleCancel = async () => {
    if (!window.confirm("Tem a certeza que deseja cancelar a sua assinatura? Perderá o acesso às funcionalidades Pro. A cobrança será interrompida imediatamente.")) {
      return;
    }
    
    setLoadingAction('cancel');
    toast.loading('A processar o cancelamento...');

    try {
      const functions = getFunctions();
      const cancelSubscription = httpsCallable(functions, 'cancelSubscription');
      await cancelSubscription();
      
      toast.dismiss();
      toast.success("Assinatura cancelada com sucesso!");
    } catch (error) {
      console.error("Erro ao cancelar:", error);
      toast.dismiss();
      toast.error("Não foi possível cancelar a assinatura. Tente novamente.");
    } finally {
      setLoadingAction(null);
    }
  };

  if (authLoading || !tenant || !currentPlan) {
    return <PageWrapper><LoadingText>A carregar informações do seu plano...</LoadingText></PageWrapper>;
  }

  return (
    <PageWrapper>
      <Header>
        <SectionTitle>Assinatura e Planos</SectionTitle>
        <Subtitle>Faça o upgrade para desbloquear todo o potencial da sua loja.</Subtitle>
      </Header>
      
      <SubscriptionStatus>
        Você está no plano <strong>{currentPlan.name}</strong>.
      </SubscriptionStatus>

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
              {plan.features.map((feature, index) => (
                <FeatureItem key={index}>
                  <FaCheckCircle /> {feature}
                </FeatureItem>
              ))}
            </PlanFeatures>

            {/* Lógica dos Botões */}
            <div style={{ marginTop: 'auto' }}>
              {tenant.plan === plan.id ? (
                plan.id === 'pro' ? (
                  <Button 
                    $variant="danger" 
                    onClick={handleCancel}
                    disabled={loadingAction === 'cancel'}
                  >
                    {loadingAction === 'cancel' ? 'A cancelar...' : 'Cancelar Assinatura'}
                  </Button>
                ) : (
                  <Button disabled>Seu Plano Atual</Button>
                )
              ) : (
                plan.id === 'pro' && (
                  <Button 
                    $variant="primary" 
                    onClick={handleSubscribe}
                    disabled={loadingAction === 'subscribe'}
                  >
                    {loadingAction === 'subscribe' ? 'Aguarde...' : 'Fazer Upgrade para Pro'}
                  </Button>
                )
              )}
            </div>
          </PlanCard>
        ))}
      </PlansContainer> {/* <- ESTA ERA A LINHA COM O ERRO, AGORA CORRIGIDA */}
    </PageWrapper>
  );
};

export default SubscriptionPage;