// src/components/ProductCard/styles.js
import styled from 'styled-components';

// Mantivemos todos os nomes originais dos seus componentes
// e apenas aplicámos as variáveis do tema (cores, espaçamentos, etc.)

export const CardWrapper = styled.div`
  background: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  box-shadow: ${({ theme }) => theme.shadows.md};
  display: flex;
  flex-direction: column;
  overflow: hidden;
  transition: ${({ theme }) => theme.transitions.default};

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  }
`;

// O nome original ProductImage foi mantido
export const ProductImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

// O nome original ProductInfo foi mantido
export const ProductInfo = styled.div`
  padding: ${({ theme }) => theme.spacing.md};
`;

// O nome original ProductName foi mantido
export const ProductName = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

// O nome original ProductPrice foi mantido
export const ProductPrice = styled.div`
  display: flex;
  align-items: baseline;
  gap: ${({ theme }) => theme.spacing.sm};
`;

// O nome original PricePrefix foi mantido
export const PricePrefix = styled.span`
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.textLight};
`;

export const Price = styled.span`
  font-size: 1.5rem;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.primary};
`;

// O nome original OldPrice foi mantido
export const OldPrice = styled.s`
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.textLight};
  text-decoration: line-through;
`;