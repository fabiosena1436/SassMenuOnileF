// Arquivo: src/pages/HomePage/styles.js

import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const HomePageWrapper = styled.div`
  padding-bottom: 50px;
`;

export const HeroSection = styled.div`
  width: 100%;
  height: 50vh;
  min-height: 400px;
  background-image: ${({ $bgImage }) => $bgImage ? `url(${$bgImage})` : 'linear-gradient(45deg, #7c3aed, #5b21b6)'};
  background-size: cover;
  background-position: center;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
`;

export const HeroContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  background-color: rgba(0, 0, 0, 0.25);
  padding: 2rem;
  border-radius: 1.5rem;
`;

export const StoreLogo = styled.img`
  width: 120px;
  height: 120px;
  object-fit: cover;
  border-radius: 50%;
  border: 4px solid white;
  box-shadow: 0 4px 15px rgba(0,0,0,0.2);
`;

export const StoreStatus = styled.div`
  background-color: ${({ $isOpen }) => ($isOpen ? '#16a34a' : '#ef4444')};
  color: white;
  padding: 8px 20px;
  border-radius: 20px;
  font-weight: bold;
`;

export const ViewMenuButton = styled(Link)`
  background-color: #5b21b6;
  color: white;
  padding: 8px 20px;
  border-radius: 20px;
  font-weight: bold;
  text-decoration: none;
  cursor: pointer;
`;

export const Section = styled.section`
  max-width: 1200px;
  margin: 50px auto;
  padding: 0 20px;
`;

export const SectionTitle = styled.h2`
  font-size: 2.2em;
  color: #5b21b6;
  text-align: center;
  margin-bottom: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
`;

export const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(270px, 1fr));
  gap: 30px;
`;

export const CarouselWrapper = styled.div`
  .swiper-slide {
    height: auto; // Garante que os cards não fiquem com alturas diferentes
  }

  .swiper-pagination-bullet-active {
    background: #5b21b6 !important;
  }
  
  .swiper-button-next,
  .swiper-button-prev {
    color: #5b21b6 !important;
    background-color: rgba(255, 255, 255, 0.8);
    border-radius: 50%;
    width: 44px;
    height: 44px;
    
    &:after {
      font-size: 1.5rem !important;
    }
  }
`;

export const LoadingText = styled.p`
  text-align: center;
  padding: 4rem;
  font-size: 1.2rem;
  color: #6b7280;
`;