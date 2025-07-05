// Arquivo: src/pages/HomePage/styles.js

import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const HomePageWrapper = styled.div`
  background-color: #f8f9fa;
`;

export const HeroSection = styled.section`
  width: 100%;
  height: 50vh;
  min-height: 450px;
  background-image: url(${({ $bgImage }) => $bgImage || 'https://via.placeholder.com/1200x500'});
  background-size: cover;
  background-position: center;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
`;

// O HeroOverlay foi removido.

export const HeroContent = styled.div`
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem; // Espaçamento entre os itens
  background-color: rgba(0, 0, 0, 0.25); // Um fundo semi-transparente para legibilidade
  padding: 2rem;
  border-radius: 1.5rem;
`;

export const StoreLogo = styled.img`
  width: 130px;
  height: 130px;
  border-radius: 50%;
  object-fit: cover;
  border: 4px solid white;
  box-shadow: 0 4px 15px rgba(0,0,0,0.2);
`;

export const StoreStatus = styled.div`
  background-color: #10b981;
  color: white;
  padding: 0.5rem 1.25rem;
  border-radius: 9999px;
  font-weight: bold;
`;

export const ViewMenuButton = styled(Link)`
  background-color: #4f46e5;
  color: white;
  padding: 0.75rem 2rem;
  border-radius: 8px;
  text-decoration: none;
  font-weight: bold;
  transition: background-color 0.2s;
  &:hover {
    background-color: #4338ca;
  }
`;

export const FeaturedSection = styled.section`
  max-width: 1200px;
  margin: 0 auto;
  padding: 3rem 1rem;
`;

export const SectionTitle = styled.h2`
  text-align: center;
  font-size: 2rem;
  margin-bottom: 2rem;
  color: #111827;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
`;

export const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(270px, 1fr));
  gap: 2rem;
`;