// src/components/ConfirmationModal/styles.js
import styled from 'styled-components';

/**
 * Documentação das Alterações:
 * - ModalTitle, ModalMessage: As cores e margens agora vêm do tema.
 * - ButtonGroup: O espaçamento entre os botões é controlado pelo `theme.spacing.md`.
 * Isto mantém o espaçamento consistente em toda a UI.
 */
export const ModalTitle = styled.h2`
  margin-top: 0;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  color: ${({ theme }) => theme.colors.text};
`;

export const ModalMessage = styled.p`
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  color: ${({ theme }) => theme.colors.textLight};
`;

export const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: ${({ theme }) => theme.spacing.md};
`;