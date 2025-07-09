// Arquivo: src/pages/Admin/PrintableReceiptPage/styles.js (Versão Completa e Final)

import styled from 'styled-components';

export const ReceiptWrapper = styled.div`
  width: 300px; /* Largura comum para impressoras de 80mm */
  margin: 2rem auto;
  padding: 1.5rem;
  background: #fff;
  box-shadow: 0 0 10px rgba(0,0,0,0.1);
  font-family: 'Courier New', Courier, monospace; /* Fonte monoespaçada para alinhamento */
  color: #000;
`;

export const Header = styled.header`
  text-align: center;
  margin-bottom: 1.5rem;
  
  img {
    max-width: 150px;
    margin-bottom: 0.5rem;
  }

  h1 {
    font-size: 1.5rem;
    margin: 0;
  }

  p {
    font-size: 0.8rem;
    margin: 0.2rem 0;
  }
`;

export const Section = styled.section`
  margin-bottom: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px dashed #888;

  &:last-of-type {
    border-bottom: none;
  }
`;

export const InfoLine = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 0.85rem;
  margin-bottom: 0.3rem;

  span:first-child {
    font-weight: bold;
  }
`;

export const ItemList = styled.div`
  margin-top: 1rem;
`;

export const Item = styled.div`
  font-size: 0.9rem;
  margin-bottom: 0.5rem;

  .item-header {
    display: flex;
    justify-content: space-between;
    font-weight: bold;
  }

  .item-details {
    font-size: 0.8rem;
    color: #333;
    padding-left: 1rem;
  }
`;

export const Totals = styled.div`
  margin-top: 1rem;
`;

export const Footer = styled.footer`
  text-align: center;
  margin-top: 1.5rem;
  font-size: 0.8rem;
`;

export const PrintButton = styled.button`
  display: block;
  width: 100%;
  padding: 1rem;
  margin-top: 2rem;
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
`;

// --- REGRAS DE IMPRESSÃO ---
// Isto garante que na hora de imprimir, o layout fique perfeito.
export const PrintStyles = styled.div`
  @media print {
    body, html {
      margin: 0;
      padding: 0;
      background: #fff;
    }
    
    #root {
      padding: 0;
    }

    ${ReceiptWrapper} {
      width: 100%;
      margin: 0;
      padding: 0;
      box-shadow: none;
    }

    ${PrintButton} {
      display: none; /* Esconde o botão de imprimir na impressão */
    }
  }
`;

export const AddressBlock = styled.div`
  font-size: 0.9rem;
  line-height: 1.4;

  p {
    margin: 0;
  }
`;