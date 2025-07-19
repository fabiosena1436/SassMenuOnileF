import styled, { css } from 'styled-components';

const variants = {
  primary: css`
    background-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.textInverted};
    &:hover:not(:disabled) {
      background-color: ${({ theme }) => theme.colors.primaryDark};
    }
  `,
  secondary: css`
    background-color: ${({ theme }) => theme.colors.secondary};
    color: ${({ theme }) => theme.colors.text};
    &:hover:not(:disabled) {
      background-color: ${({ theme }) => theme.colors.secondaryDark};
    }
  `,
  danger: css`
    background-color: ${({ theme }) => theme.colors.danger};
    color: ${({ theme }) => theme.colors.textInverted};
    &:hover:not(:disabled) {
      background-color: ${({ theme }) => theme.colors.dangerDark};
    }
  `,
};

export const ButtonWrapper = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.lg};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: ${({ theme }) => theme.transitions.default};
  text-align: center;
  line-height: 1.5;
  white-space: nowrap; // Impede que o texto do botão quebre a linha

  /* Aplica o estilo da variante (primary, secondary, etc.) */
  ${({ $variant }) => variants[$variant] || variants.primary}

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  &:active:not(:disabled) {
    transform: scale(0.98);
  }
  
  // --- ALTERAÇÃO PARA RESPONSIVIDADE ADICIONADA AQUI ---
  @media (max-width: 768px) {
    // Usamos o padding menor do tema para manter a consistência
    padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.md};
    font-size: 0.9rem;
  }
`;