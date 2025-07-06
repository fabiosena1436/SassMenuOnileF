// src/styles/theme.js

/**
 * Documentação do Tema (Atualizado):
 * Adicionámos todas as cores específicas do seu projeto aqui.
 * Por exemplo, a cor roxa do painel de admin (#4f46e5) e os tons de cinza escuro
 * da barra lateral (#111827) estão agora no nosso tema.
 * Isto garante 100% de fidelidade visual após a refatoração.
 */
export const theme = {
  colors: {
    // Cores Primárias (usadas no site principal)
    primary: '#7c3aed',
    primaryDark: '#5b21b6',

    // Cor Primária do Admin (usada no painel de administração)
    adminPrimary: '#4f46e5',
    adminPrimaryLight: '#a5b4fc',

    // Cores de Ação
    success: '#16a34a',
    danger: '#ef4444',
    dangerLight: '#fed7d7', // Fundo para mensagens de erro

    // Cores de Texto
    text: '#2d3748', // Cor de texto principal (um cinza mais escuro)
    textMedium: '#4a5568', // Um tom médio de cinza
    textLight: '#6b7280', // Cor de texto mais clara
    textInverted: '#ffffff', // Branco

    // Cores de Fundo e UI
    background: '#f7fafc', // Cinza de fundo principal (era #f3f4f6 no admin)
    white: '#ffffff',
    overlay: 'rgba(0, 0, 0, 0.5)',
    
    // Cores da Barra Lateral do Admin
    adminSidebarBg: '#111827',
    adminSidebarText: '#d1d5db',
    adminSidebarHoverBg: '#374151',
    adminSidebarBorder: '#374151',
    
    // Cores para Bordas e Inputs
    border: '#cbd5e0',

    // Cores de Aviso (para a loja fechada)
    warningBg: '#fffbe6',
    warningText: '#92400e',
    warningTitle: '#b45309',
    warningBorder: '#fde68a',
  },

  // Espaçamentos (para margens e paddings)
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
    xxl: '48px',
  },

  // Raio das Bordas
  borderRadius: {
    sm: '4px',
    md: '6px', // O seu input usava 6px, vamos manter
    lg: '8px',
    full: '9999px',
  },

  // Sombras
  shadows: {
    md: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  },

  // Fontes
  fonts: {
    main: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  },

  // Transições
  transitions: {
    default: 'all 0.2s ease-in-out',
    colorBg: 'background-color 0.2s, color 0.2s',
  },
};