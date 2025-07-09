// Arquivo: src/pages/MenuPage/styles.js (VERSÃO CORRIGIDA)

import styled from 'styled-components';

export const MenuPageWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  /* O padding-top foi removido para eliminar o espaço extra */
  padding: 0 1rem 2rem;
`;

export const MenuHeader = styled.div`
  text-align: center;
  margin-bottom: 2rem;
`;

export const MenuTitle = styled.h1`
  font-size: 2.5rem;
  color: #1f2937;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

export const SearchContainer = styled.div`
  margin-bottom: 2rem;
  position: relative;

  svg {
    position: absolute;
    left: 15px;
    top: 50%;
    transform: translateY(-50%);
    color: #9ca3af;
  }
`;

export const SearchInput = styled.input`
  width: 100%;
  padding: 1rem 1rem 1rem 40px;
  border-radius: 9999px;
  border: 1px solid #d1d5db;
  font-size: 1rem;
  transition: border-color 0.2s, box-shadow 0.2s;

  &:focus {
    outline: none;
    border-color: #4f46e5;
    box-shadow: 0 0 0 1px #4f46e5;
  }
`;

export const CategoryCarouselWrapper = styled.div`
  margin-bottom: 2.5rem;
  .swiper-slide {
    width: auto; // Permite que os botões tenham larguras diferentes
  }
`;

export const CategoryButton = styled.button`
  padding: 0.5rem 1.5rem;
  border-radius: 9999px;
  border: 2px solid ${({ $isActive }) => ($isActive ? '#4f46e5' : '#e5e7eb')};
  background-color: ${({ $isActive }) => ($isActive ? '#eef2ff' : 'transparent')};
  color: ${({ $isActive }) => ($isActive ? '#4f46e5' : '#374151')};
  font-weight: 600;
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.2s ease-in-out;
`;

export const LoadingText = styled.p`
  text-align: center;
  padding: 4rem;
  font-size: 1.2rem;
  color: #6b7280;
`;

export const NoProductsText = styled.p`
  text-align: center;
  padding: 3rem;
  color: #6b7280;
  font-size: 1.1rem;
`;

export const DesktopProductList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 2rem;

  @media (max-width: 768px) {
    display: none;
  }
`;

export const MobileProductList = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    /* Adicionado para dar espaço no final da lista */
    padding-bottom: 80px; 
  }
`;

// --- NOVO ESTILO PARA O TÍTULO DO GRUPO DE PRODUTOS ---
export const ProductGroupTitle = styled.h2`
    font-size: 1.5rem;
    color: ${({ theme }) => theme.colors.textDark};
    margin-top: 2rem;
    margin-bottom: 1rem;
    padding-bottom: 0.5rem;
    border-bottom: 2px solid ${({ theme }) => theme.colors.borderLight};
`;