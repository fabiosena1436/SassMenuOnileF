// Arquivo: src/pages/MenuPage/styles.js

import styled from 'styled-components';

export const MenuContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
  
  h1 {
    text-align: center;
    font-size: 2.5rem;
    margin-bottom: 2rem;
    color: #333;
  }
`;

export const CategorySection = styled.section`
  margin-bottom: 3rem;
`;

export const CategoryTitle = styled.h2`
  font-size: 1.8rem;
  color: #c53030; /* Vermelho escuro para destaque */
  padding-bottom: 0.5rem;
  border-bottom: 2px solid #f7fafc;
  margin-bottom: 1.5rem;
`;

export const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
`;

export const LoadingText = styled.p`
  text-align: center;
  font-size: 1.5rem;
  padding: 4rem;
  color: #718096;
`;

export const InfoText = styled.p`
  text-align: center;
  font-size: 1rem;
  padding: 1.5rem;
  color: #4a5568;
  background-color: #f7fafc;
  border-radius: 8px;
`;