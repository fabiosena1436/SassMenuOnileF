// Ficheiro: src/pages/Admin/SubscriptionPage/index.js

import React, { useState } from 'react';
import { getFunctions, httpsCallable } from 'firebase/functions';
import Button from '../../../components/Button';
import { FaCheckCircle } from 'react-icons/fa';
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

  // Função que chama a nossa Firebase Function
  const handleSubscribe = async (planId) => {
    setLoading(true);
    try {
      const functions = getFunctions();
      const createSubscription = httpsCallable(functions, 'createSubscription');
      
      console.log(`A chamar a função 'createSubscription' com o plano: ${planId}`);

      const result = await createSubscription({ planId: planId });
      
      // A função retorna um objeto com a URL de checkout
      const { checkoutUrl } = result.data;

      console.log(`Recebida a URL de checkout: ${checkoutUrl}`);

      // Redireciona o utilizador para a página de pagamento do Mercado Pago
      window.location.href = checkoutUrl;

    } catch (error) {
      console.error("Erro ao criar a assinatura:", error);
      alert("Ocorreu um erro ao iniciar a sua assinatura. Por favor, tente novamente.");
      setLoading(false);
    }
  };

  return (
    <PageWrapper>
      <SectionTitle>Escolha o seu Plano</SectionTitle>

      {loading ? (
        <LoadingText>A preparar o seu checkout seguro...</LoadingText>
      ) : (
        <PlansContainer>
          <PlanCard>
            <PlanTitle>Básico</PlanTitle>
            <PlanPrice>Grátis</PlanPrice>
            <PlanFeatures>
              <li><FaCheckCircle color="#ccc" /> Cardápio Online</li>
              <li><FaCheckCircle color="#ccc" /> Até 10 produtos</li>
              <li><FaCheckCircle color="#ccc" /> Suporte por Email</li>
            </PlanFeatures>
            <Button disabled>Plano Atual</Button>
          </PlanCard>

          <PlanCard highlight>
            <PlanTitle>Pro</PlanTitle>
            <PlanPrice>R$ 29,90<span>/mês</span></PlanPrice>
            <PlanFeatures>
              <li><FaCheckCircle color="green" /> Cardápio Online</li>
              <li><FaCheckCircle color="green" /> Produtos Ilimitados</li>
              <li><FaCheckCircle color="green" /> Gestão de Promoções</li>
              <li><FaCheckCircle color="green" /> Suporte Prioritário</li>
            </PlanFeatures>
            {/* O clique neste botão chama a nossa função com o ID do plano */}
            <Button onClick={() => handleSubscribe('plano_pro_mensal')}>
              Fazer Upgrade
            </Button>
          </PlanCard>
        </PlansContainer>
      )}
    </PageWrapper>
  );
};

export default SubscriptionPage;