// src/components/Modal/styles.js
import styled from 'styled-components';

// Restaurámos a estrutura original dos componentes do Modal
// e aplicámos as variáveis do tema a cada parte.

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${({ theme }) => theme.colors.overlay};
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

export const ModalContent = styled.div`
  background: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  box-shadow: ${({ theme }) => theme.shadows.md};
  position: relative;
  max-width: 500px;
  width: 90%;
  display: flex;
  flex-direction: column;
  max-height: 90vh;
`;

// O nome original ModalHeader foi mantido
export const ModalHeader = styled.div`
  padding: ${({ theme }) => theme.spacing.lg};
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderLight};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

// O nome original ModalTitle foi mantido
export const ModalTitle = styled.h2`
  margin: 0;
  font-size: 1.25rem;
  color: ${({ theme }) => theme.colors.text};
`;

// O nome original ModalCloseButton foi mantido
export const ModalCloseButton = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  line-height: 1;
  color: ${({ theme }) => theme.colors.textLight};
  cursor: pointer;
  transition: ${({ theme }) => theme.transitions.default};

  &:hover {
    color: ${({ theme }) => theme.colors.text};
  }
`;

// O nome original ModalBody foi mantido
export const ModalBody = styled.div`
  padding: ${({ theme }) => theme.spacing.lg};
  overflow-y: auto;
`;

// O nome original ModalFooter foi mantido
export const ModalFooter = styled.div`
  padding: ${({ theme }) => theme.spacing.lg};
  border-top: 1px solid ${({ theme }) => theme.colors.borderLight};
  display: flex;
  justify-content: flex-end;
  gap: ${({ theme }) => theme.spacing.md};
`;

// Renomeei de volta para CloseButton para o ConfirmationModal não quebrar,
// mas adicionei os outros que faltavam.
// No seu Modal/index.js, você pode usar ModalCloseButton agora.
export const CloseButton = ModalCloseButton;