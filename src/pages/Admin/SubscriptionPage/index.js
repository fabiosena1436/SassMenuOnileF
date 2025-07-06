// Arquivo: src/pages/Admin/SubscriptionPage/index.js

import React, { useState } from 'react';
import { getFunctions, httpsCallable } from 'firebase/functions';
import { useAuth } from '../../../contexts/AuthContext'; // 1. Importar o useAuth
import Button from '../../../components/Button';
import { FaCheckCircle } from 'react-icons/fa';
import toast from 'react-hot-toast';

import {
  PageWrapper,
  SectionTitle,
  PlansContainer,
  PlanCard,
  PlanTitle,
  PlanPrice,
  PlanFeatures,
  LoadingText
} from './styles';

const SubscriptionPage = () => {
  const [loading, setLoading] = useState(false);
  const { tenant } = useAuth(); // 2. Obter os dados do lojista (incluindo o plano)

  const handleSubscribe = async (planId) => {
    setLoading(true);
    try {
      const functions = getFunctions();
      const createSubscription = httpsCallable(functions, 'createSubscription');
      const result = await createSubscription({ planId });
      const { checkoutUrl } = result.data;
      window.location.href = checkoutUrl;
    } catch (error) {
      console.error("Erro ao criar a assinatura:", error);
      toast.error("Ocorreu um erro ao iniciar a sua assinatura.");
      setLoading(false);
    }
  };

  // Se os dados do lojista ainda não carregaram, mostra uma mensagem
  if (!tenant) {
    return <PageWrapper><LoadingText>A carregar informações do seu plano...</LoadingText></PageWrapper>;
  }

  return (
    <PageWrapper>
      <SectionTitle>Escolha o seu Plano</SectionTitle>

      {loading ? (
        <LoadingText>A preparar o seu checkout seguro...</LoadingText>
      ) : (
        <PlansContainer>
          {/* Cartão do Plano Básico */}
          <PlanCard highlight={tenant.plan === 'pro'}>
            <PlanTitle>Básico</PlanTitle>
            <PlanPrice>Grátis</PlanPrice>
            <PlanFeatures>
              <li><FaCheckCircle color={tenant.plan === 'basic' || tenant.plan === 'pro' ? 'green' : '#ccc'} /> Cardápio Online</li>
              <li><FaCheckCircle color={tenant.plan === 'basic' || tenant.plan === 'pro' ? 'green' : '#ccc'} /> Até 10 produtos</li>
              
            </PlanFeatures>
            
            {/* 3. Lógica do botão */}
            {tenant.plan === 'basic' ? (
                <Button disabled>Plano Atual</Button>
            ) : (
                <Button $variant="secondary">Fazer Downgrade</Button> // Funcionalidade futura
            )}
          </PlanCard>

          {/* Cartão do Plano Pro */}
          <PlanCard highlight={tenant.plan === 'basic'}>
            <PlanTitle>Pro</PlanTitle>
            <PlanPrice>R$ 29,90<span>/mês</span></PlanPrice>
            <PlanFeatures>
              <li><FaCheckCircle color="green" /> Cardápio Online</li>
              <li><FaCheckCircle color="green" /> Produtos Ilimitados</li>
              <li><FaCheckCircle color="green" /> Gestão de Promoções</li>
              <li><FaCheckCircle color="green" /> Suporte Prioritário</li>
            </PlanFeatures>

            {/* 4. Lógica do botão */}
            {tenant.plan === 'pro' ? (
                <Button disabled>Plano Atual</Button>
            ) : (
                <Button onClick={() => handleSubscribe('plano_pro_mensal')}>
                    Fazer Upgrade
                </Button>
            )}
          </PlanCard>
        </PlansContainer>
      )}
    </PageWrapper>
  );
};

export default SubscriptionPage;