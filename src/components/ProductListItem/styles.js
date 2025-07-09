// Arquivo: src/components/ProductListItem/styles.js

import styled from 'styled-components';

export const ListItemWrapper = styled.div` 
  display: flex;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  overflow: hidden;
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
  align-items: center;
  padding: 0.75rem;
  gap: 1rem;
`;

export const ProductImage = styled.img`
  width: 80px;
  height: 80px;
  object-fit: cover;
  flex-shrink: 0;
  border-radius: 6px;
`;

export const ProductInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex-grow: 1;
`;

export const ProductName = styled.h3`
  margin: 0 0 4px 0;
  font-size: 1.1em;
  color: #333;
  font-weight: 600;
`;

export const ProductPrice = styled.div`
  margin: 0;
  font-size: 1.1em;
  font-weight: bold;
  color: #4f46e5;
`;

export const PricePrefix = styled.span`
  font-size: 0.8rem;
  font-weight: 500;
  color: #6b7280;
  display: block;
`;

export const OldPrice = styled.span`
  text-decoration: line-through;
  color: #9ca3af;
  margin-right: 0.5rem;
  font-size: 0.9rem;
`;