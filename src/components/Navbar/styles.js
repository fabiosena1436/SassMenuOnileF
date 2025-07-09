// Arquivo: src/components/Navbar/styles.js
import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const NavbarContainer = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 2rem; /* Aumentado o padding lateral */
  height: 70px;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.08);
  position: sticky; /* Mudado para 'sticky' para melhor performance */
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;

  @media (max-width: 768px) {
    padding: 0 1rem;
  }
`;

export const Logo = styled.div`
  display: flex;
  align-items: center;
  height: 100%;

  img {
    height: 45px;
    width: auto;
    object-fit: contain;
  }

  span {
    font-size: 1.5rem;
    font-weight: bold;
    color: #333;
  }
`;

export const NavLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 30px;

  /* Os links do topo somem no mobile para dar lugar à barra inferior */
  @media (max-width: 768px) {
    display: none;
  }
`;

export const NavLinkItem = styled.div`
  a {
    display: flex;
    align-items: center;
    gap: 8px;
    text-decoration: none;
    transition: color 0.2s;
    
    /* Corrigido para usar a prop 'active' corretamente com styled-components */
    color: ${({ active }) => (active ? '#e53e3e' : '#4a5568')};
    font-weight: ${({ active }) => (active ? '600' : '500')};

    &:hover {
      color: #e53e3e;
    }

    svg {
      font-size: 1.2rem;
    }
  }
`;

export const RightActions = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

export const AdminLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: 8px;
  text-decoration: none;
  color: #4a5568;
  
  &:hover {
    color: #000;
  }

  /* Admin link também some no mobile para manter a UI limpa */
  @media (max-width: 768px) {
    display: none;
  }
`;

export const CartIcon = styled(Link)`
  position: relative;
  color: #333;
  font-size: 1.8rem;
  display: flex;
  align-items: center;
`;

export const CartCount = styled.span`
  position: absolute;
  top: -5px;
  right: -10px;
  background-color: #e53e3e;
  color: white;
  border-radius: 50%;
  padding: 2px 6px;
  font-size: 0.75rem;
  font-weight: bold;
`;

/* --- NOVO COMPONENTE PARA NAVEGAÇÃO MOBILE --- */
export const MobileBottomNav = styled.div`
  display: none; /* Escondido em telas grandes */

  @media (max-width: 768px) {
    display: flex;
    justify-content: space-around;
    align-items: center;
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 65px;
    background-color: #fff;
    box-shadow: 0 -2px 5px rgba(0,0,0,0.1);
    z-index: 1000;
  }
`;

/* Item da barra de navegação inferior */
export const MobileNavLink = styled(Link)`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  text-decoration: none;
  font-size: 0.75rem;
  color: ${({ active }) => (active ? '#e53e3e' : '#4a5568')};
  font-weight: ${({ active }) => (active ? '600' : '500')};

  svg {
    font-size: 1.5rem;
  }
`;