// src/pages/HomePage/styles.js
import styled from 'styled-components';
import { Link } from 'react-router-dom';

// Todos os nomes de componentes foram mantidos.

export const HomePageWrapper = styled.div`
  padding-bottom: 50px;
`;

export const HeroSection = styled.div`
  width: 100%;
  height: 50vh;
  min-height: 400px;
  background-image: ${({ $bgImage, theme }) =>
    $bgImage ? `url(${$bgImage})` : `linear-gradient(45deg, ${theme.colors.primary}, ${theme.colors.primaryDark})`};
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
  background-color: rgba(0, 0, 0, 0.25); /* Mantido por ser específico */
  padding: 2rem;
  border-radius: 1.5rem;

  @media (max-width: 480px) {
    padding: 1.5rem;
  }
`;

export const StoreLogo = styled.img`
  width: 120px;
  height: 120px;
  object-fit: cover;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  border: 4px solid ${({ theme }) => theme.colors.white};
  box-shadow: 0 4px 15px rgba(0,0,0,0.2);
`;

export const StoreStatus = styled.div`
  background-color: ${({ $isOpen, theme }) => ($isOpen ? theme.colors.success : theme.colors.danger)};
  color: ${({ theme }) => theme.colors.white};
  padding: 8px 20px;
  border-radius: 20px;
  font-weight: bold;
`;

export const ViewMenuButton = styled(Link)`
  background-color: ${({ theme }) => theme.colors.primaryDark};
  color: ${({ theme }) => theme.colors.white};
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
  color: ${({ theme }) => theme.colors.primaryDark};
  text-align: center;
  margin-bottom: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;

  @media (max-width: 768px) {
    font-size: 1.8em;
  }
`;

export const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(270px, 1fr));
  gap: 30px;

  /* Alteração para telas de celular */
  @media (max-width: 600px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 15px;
  }
`;

export const CarouselWrapper = styled.div`
  .swiper-slide {
    height: auto;
  }

  .swiper-pagination-bullet-active {
    background: ${({ theme }) => theme.colors.primaryDark} !important;
  }
  
  .swiper-button-next,
  .swiper-button-prev {
    color: ${({ theme }) => theme.colors.primaryDark} !important;
    background-color: rgba(255, 255, 255, 0.8);
    border-radius: ${({ theme }) => theme.borderRadius.full};
    width: 44px;
    height: 44px;
    
    &:after {
      font-size: 1.5rem !important;
    }

    @media (max-width: 768px) {
      display: none; /* Esconde as setas de navegação em telas menores */
    }
  }
`;

export const LoadingText = styled.p`
  text-align: center;
  padding: 4rem;
  font-size: 1.2rem;
  color: ${({ theme }) => theme.colors.textLight};
`;

export const StoreClosedWarning = styled.div`
  background-color: ${({ theme }) => theme.colors.warningBg};
  color: ${({ theme }) => theme.colors.warningText};
  border: 1px solid ${({ theme }) => theme.colors.warningBorder};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: 1rem 1.5rem;
  margin: -20px auto 40px auto;
  max-width: 1160px;
  width: 90%;
  text-align: center;
  box-shadow: 0 4px 10px rgba(0,0,0,0.05);
  position: relative;
  z-index: 5;

  h3 {
    margin-top: 0;
    font-size: 1.4em;
    color: ${({ theme }) => theme.colors.warningTitle};
  }

  p {
    margin: 5px 0 0 0;
    white-space: pre-wrap;
  }
`;