// Arquivo: src/components/ProductCard/styles.js

import styled from 'styled-components';

export const CardWrapper = styled.div`
  background-color: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0,0,0,0.08);
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
  display: flex;
  flex-direction: column;
  height: 100%;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 20px rgba(0,0,0,0.12);
  }
`;

export const ProductImage = styled.img`
  width: 100%;
  height: 180px;
  object-fit: cover;
`;

export const ProductInfo = styled.div`
  padding: 1rem;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const ProductName = styled.h4`
  margin: 0 0 0.5rem 0;
  font-size: 1rem;
  font-weight: 600;
  color: #1f2937;
`;

export const ProductPrice = styled.p`
  margin: 0;
  font-size: 1.1rem;
  font-weight: 700;
  color: #4f46e5;
`;

export const PricePrefix = styled.span`
  font-size: 0.8rem;
  font-weight: 500;
  color: #6b7280;
  display: block;
`;

// A prop OldPrice não está a ser usada no novo ProductCard, mas podemos mantê-la para o futuro
export const OldPrice = styled.span`
  text-decoration: line-through;
  color: #9ca3af;
  margin-right: 0.5rem;
  font-size: 0.9rem;
`;