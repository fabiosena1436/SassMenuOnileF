// Ficheiro completo: src/components/AcaiCustomizationModal/styles.js

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
  z-index: 1000;
`;

export const ModalContent = styled.div`
  background: #fff;
  border-radius: 12px;
  width: 90%;
  max-width: 600px;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

export const ModalHeader = styled.div`
  padding: 1rem 1.5rem;
  border-bottom: 1px solid #eee;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const ProductTitle = styled.h3`
  margin: 0;
  font-size: 1.5rem;
  color: #333;
`;

export const ModalCloseButton = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #888;
  &:hover {
    color: #000;
  }
`;

export const ModalBody = styled.div`
  padding: 1.5rem;
  overflow-y: auto;
`;

export const SizeSelection = styled.div`
  margin-bottom: 1.5rem;
  h4 {
    margin-top: 0;
    margin-bottom: 1rem;
  }
`;

export const SizeOption = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 1rem;
  border: 2px solid ${props => (props.selected ? '#7c3aed' : '#eee')};
  border-radius: 8px;
  margin-bottom: 0.5rem;
  cursor: pointer;
  transition: all 0.2s;
  font-weight: ${props => (props.selected ? 'bold' : 'normal')};

  &:hover {
    border-color: #7c3aed;
  }
`;

export const ToppingsSection = styled.div`
  margin-bottom: 1.5rem;
  h4 {
    margin-top: 0;
    margin-bottom: 1rem;
    border-bottom: 1px solid #eee;
    padding-bottom: 0.5rem;
  }
`;

export const ToppingOption = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem 0;

  label {
    flex-grow: 1;
    margin-left: 0.5rem;
  }

  input[type="checkbox"] {
    width: 20px;
    height: 20px;
  }
`;

export const ModalFooter = styled.div`
  padding: 1rem 1.5rem;
  border-top: 1px solid #eee;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #f9f9f9;
`;

export const PriceInfo = styled.div`
  font-size: 1.2rem;
  font-weight: bold;
`;