// Ficheiro: src/utils/plans.js

export const PLANS = [
  {
    id: 'basic',
    name: 'Básico',
    description: 'A forma mais rápida de ter o seu cardápio online e receber pedidos.',
    price: 'Grátis',
    priceDetails: 'para começar',
    isFeatured: false,
    // O ID do preço no Mercado Pago será usado pelo backend
    // Por enquanto, não é usado, mas é uma boa prática
    mercadoPagoPlanId: null, 
    features: [
      'Cardápio Online Responsivo',
      'Até 10 produtos cadastrados',
      'Pedidos via WhatsApp',
      'Painel de Gestão',
    ],
  },
  {
    id: 'pro',
    name: 'Pro',
    description: 'A solução completa para profissionalizar e escalar as suas vendas.',
    price: 'R$ 59,90',
    priceDetails: '/mês',
    isFeatured: true,
    mercadoPagoPlanId: 'plano_pro_mensal_menu_online', // ID único para o plano no MP
    features: [
      'Cardápio Online Responsivo',
      'Pedidos via WhatsApp',
      'Painel de Gestão',
      'Produtos Ilimitados',
      'Fazer uploads de suas imagens',
      'Gestão de Promoções',
      'Suporte Prioritário',
    ],
  },
];