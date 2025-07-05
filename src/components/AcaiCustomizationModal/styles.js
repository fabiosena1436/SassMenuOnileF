// Arquivo: src/components/AcaiCustomizationModal/styles.js

import styled from 'styled-components';

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2000;
`;

export const ModalContent = styled.div`
  background: white;
  border-radius: 16px;
  width: 90%;
  max-width: 600px;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

export const ModalHeader = styled.div`
  padding: 1rem 1.5rem;
  border-bottom: 1px solid #e5e7eb;
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
    color: #9ca3af;
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
  color: #4b5563;
`;

export const OptionsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 0.75rem;
`;

export const OptionButton = styled.button`
  padding: 0.75rem 1rem;
  border-radius: 8px;
  border: 2px solid ${({ $isSelected }) => ($isSelected ? '#4f46e5' : '#e5e7eb')};
  background-color: ${({ $isSelected }) => ($isSelected ? '#eef2ff' : 'transparent')};
  color: ${({ $isSelected }) => ($isSelected ? '#4f46e5' : '#374151')};
  font-weight: 600;
  cursor: pointer;
  text-align: center;
  transition: all 0.2s ease-in-out;

  &:hover {
    border-color: #4f46e5;
  }
`;

export const NotesTextarea = styled.textarea`
  width: 100%;
  min-height: 80px;
  padding: 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 1rem;
  resize: vertical;

  &:focus {
    outline: none;
    border-color: #4f46e5;
    box-shadow: 0 0 0 1px #4f46e5;
  }
`;

export const ModalFooter = styled.div`
  padding: 1rem 1.5rem;
  border-top: 1px solid #e5e7eb;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  background-color: #f9fafb;
`;

export const QuantitySelector = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid #d1d5db;
  border-radius: 8px;

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

// PriceDisplay não foi usado no index.js que te enviei, mas é bom ter.
export const PriceDisplay = styled.span`
  font-size: 1.5rem;
  font-weight: bold;
  color: #111827;
`;