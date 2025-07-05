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
  padding: 16px;
  text-align: center;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
`;

export const ProductName = styled.h3`
  margin: 0 0 8px 0;
  font-size: 1.1em;
  font-weight: 600;
  color: #333;
  flex-grow: 1; /* Garante que o nome ocupe o espaço necessário */
`;

export const ProductPrice = styled.p`
  margin: 0;
  font-size: 1.25em;
  font-weight: bold;
  color: #7c3aed;
  margin-top: auto; /* Empurra o preço para baixo */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  line-height: 1.2;
  gap: 4px;
`;

export const PricePrefix = styled.span`
  font-size: 0.7em;
  font-weight: 500;
  color: #6b7280;
  text-transform: uppercase;
`;

export const OldPrice = styled.s`
  font-size: 0.8em;
  font-weight: 500;
  color: #9ca3af;
  text-decoration: line-through;
`;