// src/styles/theme.js
export const theme = {
  colors: {
    // Cores Primárias (roxo)
    primary: '#7c3aed',
    primaryDark: '#5b21b6',
    primaryLight: '#c084fc',
    primaryLighter: '#e9d5ff',

    // Cor Primária do Admin (azul/roxo)
    adminPrimary: '#4f46e5',
    adminPrimaryLight: '#a5b4fc',

    // Cores de Ação
    success: '#16a34a', // Verde para "Loja Aberta"
    successDark: '#22c55e', // Verde para borda "Disponível"
    successDarker: '#166534', // Verde para preço
    danger: '#ef4444',
    dangerLight: '#fed7d7',

    // Cores de Feedback
    info: '#4299e1', // Azul para focus em inputs

    // Cores de Texto
    textDarkest: '#1a202c', // Títulos principais do admin
    textDark: '#333333',
    textMedium: '#4a5568',
    textLight: '#718096',
    textSubtle: '#777777',
    textInverted: '#ffffff',

    // Cores de Fundo e UI
    background: '#f8f9fa', // Fundo principal (era #f7fafc, este é mais comum)
    backgroundLight: '#f3f4f6', // Fundo para tags e hover
    white: '#ffffff',
    overlay: 'rgba(0, 0, 0, 0.5)',
    
    // Cores da Barra Lateral do Admin
    adminSidebarBg: '#111827',
    adminSidebarText: '#d1d5db',
    adminSidebarHoverBg: '#374151',
    adminSidebarBorder: '#374151',
    
    // Cores para Bordas e Inputs
    border: '#cbd5e0',
    borderMedium: '#dddddd',
    borderLight: '#eeeeee',
    
    // Cores de Aviso (Loja Fechada)
    warningBg: '#fffbe6',
    warningText: '#92400e',
    warningTitle: '#b45309',
    warningBorder: '#fde68a',

    // Outras
    neutral: '#a1a1aa', // Cinza para "Indisponível"
  },
  spacing: {
    xs: '4px', sm: '8px', md: '16px', lg: '24px', xl: '32px', xxl: '48px',
  },
  borderRadius: {
    sm: '4px', md: '6px', lg: '8px', full: '9999px',
  },
  shadows: {
    sm: '0 2px 4px rgba(0,0,0,0.05)',
    md: '0 4px 12px rgba(0, 0, 0, 0.08)',
  },
  fonts: {
    main: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  },
  transitions: {
    default: 'all 0.2s ease-in-out',
    colorBg: 'background-color 0.2s, color 0.2s',
  },
};