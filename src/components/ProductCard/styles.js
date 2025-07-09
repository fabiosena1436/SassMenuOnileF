// src/components/ProductCard/styles.js
import styled from 'styled-components';

export const CardWrapper = styled.div`
  background: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  box-shadow: ${({ theme }) => theme.shadows.md};
  display: flex;
  flex-direction: column;
  overflow: hidden;
  transition: ${({ theme }) => theme.transitions.default};
  cursor: pointer;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  }
`;

export const ProductImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;

  /* --- MUDANÇA PARA RESPONSIVIDADE --- */
  @media (max-width: 400px) {
    height: 150px; /* Diminui a altura da imagem em telas muito pequenas */
  }
`;

export const ProductInfo = styled.div`
  padding: ${({ theme }) => theme.spacing.md};
`;

export const ProductName = styled.h3`
  font-size: 1.1rem; /* Leve ajuste no tamanho da fonte */
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  margin: 0 0 ${({ theme }) => theme.spacing.sm} 0; /* Margem ajustada */
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const ProductPrice = styled.div`
  display: flex;
  align-items: baseline;
  gap: ${({ theme }) => theme.spacing.sm};
  font-size: 1.25rem; /* Tamanho da fonte do preço */
  font-weight: bold;
  color: ${({ theme }) => theme.colors.primary};
`;

export const PricePrefix = styled.span`
  font-size: 0.8rem; /* Tamanho do prefixo */
  font-weight: 500;
  color: ${({ theme }) => theme.colors.textLight};
`;

export const OldPrice = styled.s`
  font-size: 0.9rem; /* Tamanho do preço antigo */
  color: ${({ theme }) => theme.colors.textLight};
  text-decoration: line-through;
  font-weight: 500;
`;

// Removido o 'Price' duplicado, já que ProductPrice já define o estilo principal.