// Arquivo: src/components/Navbar/styles.js (VERSÃO CORRIGIDA)

import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const NavbarContainer = styled.header`
  background-color: rgb(250, 243, 243);
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #eee;
  position: sticky;
  top: 0;
  z-index: 100;

  @media (max-width: 768px) {
    padding: 0.75rem;
  }
`;

export const Logo = styled(Link)`
  display: flex;
  align-items: center;
  text-decoration: none;
  color: #333;
  font-weight: bold;
  font-size: 1.2rem;

  img {
    max-height: 40px;
    margin-right: 10px;
    /* Adicionando borda arredondada ao logo */
    border-radius: 30%;
    object-fit: contain; /* Garante que a imagem caiba no círculo */
    width: auto;
    height: auto;
    max-width: 40px;
  }

  span {
    /* Estilos para o nome da loja caso não haja logo */
  }
`;

export const NavLinks = styled.nav`
  display: flex;
  gap: 1.5rem;

  @media (max-width: 768px) {
    display: none;
  }
`;

export const NavLinkItem = styled.div`
  a {
    text-decoration: none;
    color: #555;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 0;
    border-bottom: 2px solid transparent;
    transition: color 0.3s ease, border-bottom 0.3s ease;

    svg {
      font-size: 1.2rem;
    }

    span {
      display: block;
    }

    &:hover, &.active {
      color: #007bff;
      border-bottom-color: #007bff;
    }
  }

  &.active a {
    color: #007bff;
    border-bottom-color: #007bff;
  }
`;

export const RightActions = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  @media (max-width: 768px) {
    gap: 0.75rem;
  }
`;

export const AdminLink = styled(Link)`
  color: #555;
  text-decoration: none;
  display: flex;
  align-items: center;
  transition: color 0.3s ease;

  svg {
    font-size: 1.4rem;
  }

  &:hover {
    color: #007bff;
  }

  @media (max-width: 768px) {
    svg {
      font-size: 1.2rem;
    }
  }
`;

export const CartIcon = styled(Link)`
  color: #555;
  text-decoration: none;
  display: flex;
  align-items: center;
  position: relative;
  transition: color 0.3s ease;

  svg {
    font-size: 1.4rem;
  }

  &:hover {
    color: #007bff;
  }

  @media (max-width: 768px) {
    svg {
      font-size: 1.2rem;
    }
  }
`;

export const CartCount = styled.span`
  position: absolute;
  top: -0.5rem;
  right: -0.5rem;
  background-color: #dc3545;
  color: white;
  font-size: 0.7rem;
  padding: 0.2rem 0.4rem;
  border-radius: 50%;
`;

export const MobileBottomNav = styled.nav`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color:rgb(15, 15, 15);
  border-top: 1px solid rgb(59, 59, 59);
  display: flex;
  justify-content: space-around;
  padding: 0.5rem 0;
  z-index: 99;

  @media (min-width: 769px) {
    display: none;
  }
`;

export const MobileNavLink = styled(Link)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: rgb(252, 247, 247);
  text-decoration: none;
  font-size: 0.8rem;
  transition: color 0.3s ease;

  svg {
    font-size: 1.2rem;
    margin-bottom: 0.2rem;
  }

  &:hover, &.active {
    color: #007bff;
  }

  &.active {
    font-weight: bold;
  }
`;