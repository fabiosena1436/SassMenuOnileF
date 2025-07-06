// src/components/AcaiCustomizationModal/styles.js
import styled from 'styled-components';

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.overlay};
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2000;
`;

export const ModalContent = styled.div`
  background: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.borderRadius.xxl};
  width: 90%;
  max-width: 600px;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

export const ModalHeader = styled.div`
  padding: 1rem 1.5rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderLight};
  display: flex;
  justify-content: space-between;
  align-items: center;

  h2 {
    margin: 0;
    font-size: 1.5rem;
  }

  button {
    background: none;
    border: none;
    font-size: 2rem;
    cursor: pointer;
    color: ${({ theme }) => theme.colors.textSubtle};
    line-height: 1;
  }
`;

export const ModalBody = styled.div`
  padding: 1.5rem;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const SectionTitle = styled.h3`
  font-size: 1.2rem;
  margin: 0 0 1rem 0;
  color: ${({ theme }) => theme.colors.textMedium};
`;

export const OptionsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 0.75rem;
`;

export const OptionButton = styled.button`
  padding: 0.75rem 1rem;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  border: 2px solid ${({ $isSelected, theme }) => ($isSelected ? theme.colors.adminPrimary : theme.colors.borderLight)};
  background-color: ${({ $isSelected, theme }) => ($isSelected ? theme.colors.primaryLightest : 'transparent')};
  color: ${({ $isSelected, theme }) => ($isSelected ? theme.colors.adminPrimary : theme.colors.textDark)};
  font-weight: 600;
  cursor: pointer;
  text-align: center;
  transition: ${({ theme }) => theme.transitions.default};

  &:hover {
    border-color: ${({ theme }) => theme.colors.adminPrimary};
  }
`;

export const NotesTextarea = styled.textarea`
  width: 100%;
  min-height: 80px;
  padding: 0.75rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  font-size: 1rem;
  resize: vertical;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.adminPrimary};
    box-shadow: 0 0 0 1px ${({ theme }) => theme.colors.adminPrimary};
  }
`;

export const ModalFooter = styled.div`
  padding: 1rem 1.5rem;
  border-top: 1px solid ${({ theme }) => theme.colors.borderLight};
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const QuantitySelector = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.lg};

  button {
    background: none;
    border: none;
    padding: 0.75rem 1rem;
    font-size: 1.2rem;
    font-weight: bold;
    cursor: pointer;
  }

  span {
    font-size: 1.1rem;
    font-weight: 600;
    padding: 0 0.5rem;
  }
`;

export const PriceDisplay = styled.span`
  font-size: 1.5rem;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.adminSidebarBg};
`;