// Arquivo: src/pages/MenuPage/styles.js

import styled from 'styled-components';

export const MenuPageWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
`;

export const MenuHeader = styled.div`
  text-align: center;
  margin-bottom: 2rem;
`;

export const MenuTitle = styled.h1`
  font-size: 2.5rem;
  color: #333;
`;

export const StoreClosedWarning = styled.div`
  background-color: #fffbeB;
  color: #b45309;
  padding: 1rem;
  border-radius: 8px;
  text-align: center;
  margin-bottom: 2rem;
  border: 1px solid #fef3c7;
`;

export const CategorySection = styled.section`
  margin-bottom: 3rem;
`;

export const CategorySectionTitle = styled.h2`
  font-size: 1.8rem;
  color: #c53030;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid #f3f4f6;
  margin-bottom: 1.5rem;
`;

export const ProductListContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 2rem;
`;

export const LoadingText = styled.p`
  text-align: center;
  font-size: 1.5rem;
  padding: 4rem;
  color: #718096;
`;

export const NoProductsText = styled.p`
  text-align: center;
  font-size: 1rem;
  padding: 1.5rem;
  color: #4a5568;
  background-color: #f7fafc;
  border-radius: 8px;
`;