// Arquivo: src/components/StoreStatusBanner/styles.js

import styled from 'styled-components';

export const Banner = styled.div`
  width: 100%;
  padding: 12px;
  text-align: center;
  font-weight: bold;
  font-size: 16px;
  color: #fff;
  background-color: ${({ isOpen }) => (isOpen ? '#2ecc71' : '#e74c3c')};

  /* --- MUDANÇA PARA RESPONSIVIDADE --- */
  @media (max-width: 600px) {
    font-size: 14px; /* Fonte um pouco menor */
    padding: 10px;   /* Padding um pouco menor */
  }
`;