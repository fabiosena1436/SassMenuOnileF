// Arquivo: src/components/ProductListItem/styles.js

import styled from 'styled-components';

export const ListItemWrapper = styled.li` // Alterado para li para semântica
  display: flex;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  overflow: hidden;
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
`;

export const ProductImage = styled.img`
  width: 120px;
  height: 140px;
  object-fit: cover;
  flex-shrink: 0;
`;

export const ProductInfo = styled.div`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex-grow: 1;
`;

export const ProductName = styled.h3`
  margin: 0 0 4px 0;
  font-size: 1.1em;
  color: #333;
  font-weight: 600;
  display: flex;
  align-items: center;
`;

export const ProductDescription = styled.p`
  margin: 0 0 8px 0;
  font-size: 0.9em;
  color: #666;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  flex-grow: 1;
`;

export const ProductPrice = styled.p`
  margin: 0;
  font-size: 1.2em;
  font-weight: bold;
  color: #16a34a;
  margin-top: 8px;
`;

// NOVO: Container para os botões
export const ActionContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 1rem;
`;