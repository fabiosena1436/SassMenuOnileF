// src/pages/Admin/AdminLayout/styles.js
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

export const AdminWrapper = styled.div`
  display: flex;
  min-height: 100vh;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const Sidebar = styled.aside`
  width: 260px;
  min-width: 260px;
  background-color: ${({ theme }) => theme.colors.adminSidebarBg};
  color: ${({ theme }) => theme.colors.textLight};
  display: flex;
  flex-direction: column;
  transition: transform 0.3s ease-in-out;
  z-index: 1000;

  @media (max-width: 768px) {
    position: fixed;
    height: 100%;
    transform: ${({ $isOpen }) => ($isOpen ? 'translateX(0)' : 'translateX(-100%)')};
  }
`;

export const SidebarTitle = styled.h1`
  font-size: 1.5rem;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.white};
  text-align: center;
  padding: 1.5rem 1rem;
`;

export const NavList = styled.nav`
  list-style: none;
  padding: 0;
  flex-grow: 1;
`;

export const StyledNavLink = styled(NavLink)`
  display: flex;
  align-items: center;
  gap: 10px;
  color: ${({ theme }) => theme.colors.adminSidebarText};
  text-decoration: none;
  padding: 0.75rem 1.5rem;
  margin: 0.25rem 0;
  border-left: 4px solid transparent;
  transition: ${({ theme }) => theme.transitions.colorBg};

  &:hover {
    background-color: ${({ theme }) => theme.colors.adminSidebarHoverBg};
    color: ${({ theme }) => theme.colors.white};
  }

  &.active {
    background-color: ${({ theme }) => theme.colors.adminPrimary};
    color: ${({ theme }) => theme.colors.white};
    font-weight: bold;
    border-left-color: ${({ theme }) => theme.colors.adminPrimaryLight};
  }
`;

export const NavSeparator = styled.hr`
  border: none;
  border-top: 1px solid ${({ theme }) => theme.colors.adminSidebarBorder};
  margin: 1rem 1.5rem;
`;

export const ContentArea = styled.main`
  flex-grow: 1;
  overflow-y: auto;
  display: flex;
  flex-direction: column;

  .admin-header {
    background: ${({ theme }) => theme.colors.white};
    padding: 1rem 2rem;
    box-shadow: 0 1px 3px rgba(0,0,0,0.1);
    display: flex;
    align-items: center;
    gap: 1rem;
    position: sticky;
    top: 0;
    z-index: 900;
  }

  .header-title {
    font-size: 1.5rem;
    margin: 0;
    color: ${({ theme }) => theme.colors.text};
    white-space: nowrap;
  }
  
  .copy-button-text {
      margin-left: 8px;
  }

  .admin-main-content {
    padding: 2rem;
    flex-grow: 1;
  }

  /* --- MUDANÇAS PARA RESPONSIVIDADE --- */
  @media (max-width: 768px) {
    .admin-header {
      padding: 1rem;
      padding-left: 60px; /* Espaço para o botão de menu fixo */
      flex-wrap: wrap; /* Permite que os itens quebrem a linha */
    }
    .header-title {
      font-size: 1.2rem; /* Título menor no mobile */
      order: 2; /* Coloca o título depois do botão */
      flex-basis: 100%; /* Faz o título ocupar a linha de baixo */
      margin-top: 0.5rem;
    }
    .admin-main-content {
      padding: 1rem;
    }
    .copy-button-text {
        /* Esconde o texto do botão em telas muito pequenas */
        @media (max-width: 480px) {
            display: none;
        }
    }
  }
`;

export const MenuButton = styled.button`
  display: none;

  @media (max-width: 768px) {
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    top: 15px;
    left: 15px;
    background: ${({ theme }) => theme.colors.adminSidebarBg};
    color: ${({ theme }) => theme.colors.white};
    border: none;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    cursor: pointer;
    z-index: 1002;
    font-size: 1.2rem;
  }
`;

export const Overlay = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: block;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: ${({ theme }) => theme.colors.overlay};
    z-index: 999;
  }
`;

export const NotificationBellWrapper = styled.button`
  position: relative;
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.textMedium};
  width: 40px;
  height: 40px;
  border-radius: 50%;
  cursor: pointer;
  font-size: 1.3rem;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: ${({ theme }) => theme.colors.background};
  }
`;

export const NotificationBadge = styled.span`
  position: absolute;
  top: 5px;
  right: 5px;
  background-color: ${({ theme }) => theme.colors.danger};
  color: ${({ theme }) => theme.colors.white};
  border-radius: 50%;
  width: 18px;
  height: 18px;
  font-size: 11px;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid ${({ theme }) => theme.colors.white};
`;



export const ExternalNavLink = styled.a`
  display: flex;
  align-items: center;
  gap: 10px;
  color: ${({ theme }) => theme.colors.adminSidebarText};
  text-decoration: none;
  padding: 0.75rem 1.5rem;
  margin: 0.25rem 0;
  border-left: 4px solid transparent;
  transition: ${({ theme }) => theme.transitions.colorBg};

  &:hover {
    background-color: ${({ theme }) => theme.colors.adminSidebarHoverBg};
    color: ${({ theme }) => theme.colors.white};
  }
`;
