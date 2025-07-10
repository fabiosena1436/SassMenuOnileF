import styled from 'styled-components';

export const MenuPageWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem 2rem;
`;

export const MenuHeader = styled.div`
  text-align: center;
  margin: 2rem 0;
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

// --- ESTILOS RESTAURADOS ---
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
// --- FIM DOS ESTILOS RESTAURADOS ---

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

export const CategoryTitle = styled.h2`
  font-size: 1.8rem;
  font-weight: 700;
  color: #1f2937;
  margin-top: 2.5rem;
  margin-bottom: 1.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid #e5e7eb;
`;

export const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 2rem;

  @media (max-width: 768px) {
    display: none;
  }
`;

export const ProductList = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding-bottom: 80px;
  }
`;