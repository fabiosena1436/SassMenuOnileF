// src/pages/Admin/PrintableReceiptPage/styles.js
import styled, { createGlobalStyle } from 'styled-components';

export const ReceiptWrapper = styled.div`
  width: 210px; 
  margin: 0.8rem auto;
  padding: 1rem;
  background: #fff;
  box-shadow: 0 0 10px rgba(0,0,0,0.1);
  font-family: 'Courier New', Courier, monospace; 
  color: #000;
  border: 1px solid #ccc;
`;

export const Header = styled.header`
  text-align: center;
  margin-bottom: 0.5rem;
  
  img {
    max-width: 120px;
    margin-bottom: 0.5rem;
  }

  h1 {
    font-size: 0.8rem;
    margin: 0;
  }

  p {
    font-size: 0.6rem;
    margin: 0.1rem 0;
  }
`;

export const Section = styled.section`
  margin-bottom: 0.20rem;
  padding-bottom: 0.20rem;
  border-bottom: 1px dashed #888;
  padding: 0 5px 0 0;

  &:last-of-type {
    border-bottom: none;
  }

  h4 {
    margin: 0 0 0.5rem 0;
    text-transform: uppercase;
    font-size: 0.7rem;
  }
`;

export const InfoLine = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 0.6rem;
  margin-bottom: 0.3rem;
  margin: 0 10 0 0;

  span:first-child {
    font-weight: bold;
  }
`;

export const ItemList = styled.div`
  margin-top: 0.5rem;
  margin: 0 10px 0 0;
`;

export const Item = styled.div`
  font-size: 0.7rem;
  margin-bottom: 0.5rem;

  .item-header {
    display: flex;
    justify-content: space-between;
    font-weight: bold;
  }

  .item-details {
    font-size: 0.75rem;
    color: #333;
    padding-left: 1rem;
  }
`;

export const Totals = styled.div`
  margin-top: 0.5rem;
  margin: 0 10px 0 0;
`;

export const Footer = styled.footer`
  text-align: center;
  margin-top: 0.3rem;
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
  font-size: 0.7rem;
  cursor: pointer;

  @media print {
    display: none;
  }
`;

export const AddressBlock = styled.div`
  font-size: 0.7rem;
  line-height: 1.4;

  p {
    margin: 0;
  }
`;

/* --- MUDANÇAS PARA CORRIGIR A IMPRESSÃO --- */
export const PrintStyles = createGlobalStyle`
  @page {
    size: 58mm auto;
    /* Removemos a margem para ter controlo total com o padding */
    margin: 0;
  }

  body {
    background-color: #f0f2f5 !important;
  }

  @media print {
    body {
      background-color: #fff !important;
    }

    body, html {
      width: 58mm;
      margin: 0;
      padding: 0;
    }
    
    #root {
      height: auto !important;
    }

    ${ReceiptWrapper} {
      width: 100%; /* Ocupa 100% dos 58mm */
      margin: 0;
      /* Damos um padding superior/inferior de 3mm e lateral de 2mm */
      padding: 3mm 2mm;
      
      /* --- MUDANÇA PRINCIPAL AQUI --- */
      /* Garante que o padding seja calculado para DENTRO, não para fora */
      box-sizing: border-box;

      box-shadow: none;
      border: none;
      font-size: 8pt;
    }

    /* Fontes refinadas para o formato mais estreito */
    ${Header} h1 { font-size: 11pt; }
    ${Header} p { font-size: 7pt; }
    ${Section} h4 { font-size: 9pt; }
    ${InfoLine}, ${Item}, ${AddressBlock} { font-size: 8pt; }
    .item-details { font-size: 7pt; }
    
    ${PrintButton} {
      display: none;
    }
  }
`;