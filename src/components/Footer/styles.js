// Arquivo: src/components/Footer/styles.js

import styled from 'styled-components';

export const FooterContainer = styled.footer`
  background-color: #1a202c; /* Um cinza escuro */
  color: #a0aec0; /* Um cinza mais claro para o texto */
  padding: 40px 5%;
`;

export const FooterContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 30px; /* Aumentei o gap para melhor espaçamento */
  max-width: 1200px;
  margin: 0 auto;
  padding-bottom: 20px;
  border-bottom: 1px solid #2d3748; /* Linha divisória sutil */

  /* --- MUDANÇA PARA RESPONSIVIDADE --- */
  @media (max-width: 768px) {
    flex-direction: column; /* Empilha os itens verticalmente */
    justify-content: center; /* Centraliza o conteúdo */
    text-align: center;
  }
`;

export const InfoSection = styled.div`
  h3 {
    color: #fff;
    margin-bottom: 10px;
    font-size: 1.2rem;
  }
`;

export const InfoItem = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  /* --- MUDANÇA PARA RESPONSIVIDADE --- */
  @media (max-width: 768px) {
    justify-content: center; /* Centraliza os itens de informação */
  }

  svg {
    color: #cbd5e0;
  }
`;

export const SocialLinks = styled.div`
  display: flex;
  gap: 20px; /* Aumentei o gap para ícones maiores */
`;

export const SocialLink = styled.a`
  color: #cbd5e0;
  font-size: 2rem; /* Ícones um pouco maiores */
  transition: color 0.3s ease;

  &:hover {
    color: #e53e3e; /* Cor de destaque ao passar o mouse */
  }
`;

export const Copyright = styled.div`
  text-align: center;
  padding-top: 20px;
  font-size: 0.9rem;
`;