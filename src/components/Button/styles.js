// src/components/Button/styles.js
import styled, { css } from 'styled-components';

/**
 * Documentação das Alterações:
 * - Variedades de Botão (variants): Em vez de definirmos as cores diretamente,
 * agora cada variante (primary, secondary, danger) busca as cores do nosso
 * objeto de tema. Ex: theme.colors.primary.
 * - Propriedades Gerais: O border-radius, a transição e a opacidade para o estado
 * desabilitado também vêm do tema. Isso garante que todos os botões na aplicação
 * tenham o mesmo raio de borda e o mesmo comportamento.
 * - Propriedade $variant: Usamos $variant em vez de variant para indicar ao
 * styled-components que esta é uma prop transitória e não deve ser passada
 * para o elemento HTML final.
 */
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

  /* Aplica o estilo da variante (primary, secondary, etc.) */
  ${({ $variant }) => variants[$variant] || variants.primary}

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  &:active:not(:disabled) {
    transform: scale(0.98);
  }
`;