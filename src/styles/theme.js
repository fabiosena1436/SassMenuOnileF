// src/styles/theme.js
export const theme = {
  colors: {
    // Cores Primárias (roxo)
    primary: '#7c3aed',
    primaryDark: '#5b21b6',
    primaryLight: '#c084fc',
    primaryLighter: '#e9d5ff',
    primaryLightest: '#eef2ff', // Fundo para seleção

    // Cor Primária do Admin (azul/roxo)
    adminPrimary: '#4f46e5',
    adminPrimaryLight: '#a5b4fc',

    // Cores de Ação
    success: '#16a34a', // Verde para "Loja Aberta"
    successDark: '#22c55e', // Verde para borda "Disponível"
    successDarker: '#166534', // Verde para preço
    successLight: '#dcfce7', // Fundo para status aberto
    danger: '#ef4444',
    dangerLight: '#fee2e2', // Fundo para status fechado
    dangerDark: '#991b1b',

    // Cores de Feedback e Destaques
    info: '#4299e1', // Azul para focus em inputs
    highlight: '#007bff', // Azul para plano em destaque

    // Cores de Texto
    textDarkest: '#1a202c',
    textDark: '#333333',
    textMedium: '#4a5563', // Era #4b5563, unificando
    textLight: '#718096',
    textSubtle: '#9ca3af', // Para botões de fechar e placeholders
    textInverted: '#ffffff',

    // Cores de Fundo e UI
    background: '#f8f9fa',
    backgroundLight: '#f3f4f6',
    white: '#ffffff',
    overlay: 'rgba(0, 0, 0, 0.6)',
    
    // Cores da Barra Lateral do Admin
    adminSidebarBg: '#111827',
    adminSidebarText: '#d1d5db',
    adminSidebarHoverBg: '#374151',
    adminSidebarBorder: '#374151',
    
    // Cores para Bordas e Inputs
    border: '#d1d5db',
    borderMedium: '#dddddd',
    borderLight: '#e5e7eb',
    
    // Cores de Aviso (Loja Fechada)
    warningBg: '#fffbe6',
    warningText: '#92400e',
    warningTitle: '#b45309',
    warningBorder: '#fde68a',

    // Outras
    neutral: '#a1a1aa',
  },
  spacing: {
    xs: '4px', sm: '8px', md: '16px', lg: '24px', xl: '32px', xxl: '48px',
  },
  borderRadius: {
    sm: '4px', md: '6px', lg: '8px', xl: '12px', xxl: '16px', full: '9999px',
  },
  shadows: {
    sm: '0 2px 4px rgba(0,0,0,0.05)',
    md: '0 4px 12px rgba(0, 0, 0, 0.08)',
    lg: '0 10px 25px -5px rgba(0, 0, 0, 0.1)',
  },
  fonts: {
    main: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  },
  transitions: {
    default: 'all 0.2s ease-in-out',
  },
};