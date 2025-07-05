// Arquivo: src/components/ProductCard/styles.js

import styled from 'styled-components';

export const CardWrapper = styled.div`
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  height: 100%;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.12);
  }
`;

export const ProductImage = styled.img`
  width: 100%;
  height: 180px;
  object-fit: cover;
`;

export const ProductInfo = styled.div`
  padding: 1rem;
  text-align: center;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
`;

export const ProductName = styled.h4`
  margin: 0 0 0.5rem 0;
  font-size: 1rem;
  font-weight: 600;
  color: #1f2937;
  flex-grow: 1;
`;

export const ProductPrice = styled.p`
  margin: 0;
  font-size: 1.2rem;
  font-weight: 700;
  color: #4f46e5;
  margin-top: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  line-height: 1.3;
  gap: 4px;
`;

export const PricePrefix = styled.span`
  font-size: 0.8rem;
  font-weight: 500;
  color: #6b7280;
`;

export const OldPrice = styled.s`
  font-size: 0.85rem;
  font-weight: 500;
  color: #9ca3af;
  text-decoration: line-through;
`;