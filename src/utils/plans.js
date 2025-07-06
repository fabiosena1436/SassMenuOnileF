// src/utils/plans.js
import { FaCheckCircle } from 'react-icons/fa';
import React from 'react';

// CORRIGIDO: Agora reflete o seu modelo de 2 planos original.
export const PLANS = [
  {
    id: 'basic',
    name: 'Básico',
    price: 'Grátis',
    priceDetails: 'para começar',
    description: 'A forma mais rápida de ter o seu cardápio online e receber pedidos.',
    features: [
      'Cardápio Online Responsivo',
      'Até 10 produtos cadastrados',
      'Pedidos via WhatsApp',
      'Painel de Gestão',
    ],
    isFeatured: false,
    stripePriceId: null
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
      'Suporte Prioritário',
    ],
    isFeatured: true,
    stripePriceId: 'plano_pro_mensal'
  }
];

// ... (o componente auxiliar PlanFeatureList continua o mesmo)