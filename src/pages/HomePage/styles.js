// Arquivo: src/pages/HomePage/styles.js

import styled from 'styled-components';

export const PageWrapper = styled.div`
  padding-bottom: 2rem;
  background-color: #f9fafb;
`;

export const HeroSection = styled.section`
  width: 100%;
  height: 45vh;
  min-height: 350px;
  background-image: linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(${({ $bgImage }) => $bgImage || 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809'});
  background-size: cover;
  background-position: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: white;
  text-align: center;
  padding: 1rem;
`;

export const StoreLogo = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  border: 3px solid white;
  margin-bottom: 1rem;
  box-shadow: 0 4px 15px rgba(0,0,0,0.2);
  object-fit: cover;
`;

export const StoreName = styled.h1`
  font-size: 2.5rem;
  margin: 0;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
`;

export const StoreStatus = styled.div`
  margin-top: 0.75rem;
  padding: 0.3rem 1rem;
  border-radius: 9999px;
  font-weight: 600;
  background-color: ${({ $isOpen }) => ($isOpen ? '#16a34a' : '#ef4444')};
  box-shadow: 0 2px 5px rgba(0,0,0,0.2);
`;

export const ContentSection = styled.section`
  max-width: 1200px;
  margin: 2.5rem auto;
  padding: 0 1rem;
`;

export const SectionTitle = styled.h2`
  font-size: 1.8rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  color: #1f2937;
`;

export const CategoryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 1.5rem;
`;

export const CategoryCard = styled.div`
  background-color: white;
  padding: 1.5rem 1rem;
  border-radius: 12px;
  text-align: center;
  border: 1px solid #e5e7eb;
  box-shadow: 0 1px 3px rgba(0,0,0,0.05);
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
    color: #4f46e5;
  }

  p {
    margin: 0;
    font-weight: 600;
    color: #374151;
  }
`;

export const ProductCarousel = styled.div`
  .swiper-button-next, .swiper-button-prev {
    color: #4f46e5;
  }
`;

export const LoadingText = styled.p`
  text-align: center;
  padding: 4rem;
  font-size: 1.2rem;
  color: #6b7280;
`;