// Arquivo: src/pages/Admin/AdminLayout/styles.js

import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

export const AdminWrapper = styled.div`
  display: flex;
  min-height: 100vh;
`;

export const Sidebar = styled.aside`
  width: 260px;
  background-color: #1f2937;
  color: #d1d5db;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  z-index: 1000;
  transition: transform 0.3s ease-in-out;

  @media (max-width: 768px) {
    transform: ${({ $isOpen }) => ($isOpen ? 'translateX(0)' : 'translateX(-100%)')};
  }
`;

export const SidebarTitle = styled.h1`
  font-size: 1.5rem;
  font-weight: bold;
  color: #ffffff;
  padding: 1.5rem;
  text-align: center;
  background-color: #111827;
`;

export const NavList = styled.nav`
  list-style: none;
  padding: 1rem 0;
  flex-grow: 1;
`;

export const StyledNavLink = styled(NavLink)`
  display: flex;
  align-items: center;
  gap: 10px;
  color: #d1d5db;
  text-decoration: none;
  padding: 0.75rem 1.5rem;
  margin: 0.25rem 0;
  border-left: 4px solid transparent;
  transition: background-color 0.2s, color 0.2s;

  &:hover {
    background-color: #374151;
    color: white;
  }

  &.active {
    background-color: #4f46e5;
    color: white;
    font-weight: bold;
    border-left-color: #a5b4fc;
  }
`;

export const NavSeparator = styled.hr`
  border: none;
  border-top: 1px solid #374151;
  margin: 1rem 1.5rem;
`;

export const ContentArea = styled.div`
  flex-grow: 1;
  background-color: #f3f4f6;
  margin-left: 260px; /* Largura da sidebar no desktop */
  
  .admin-header {
    background: white;
    padding: 1rem 2rem;
    box-shadow: 0 1px 3px rgba(0,0,0,0.1);
    display: flex;
    align-items: center;
  }

  .header-title {
    font-size: 1.5rem;
    margin: 0;
    color: #111827;
  }

  .admin-main-content {
    padding: 2rem;
  }

  @media (max-width: 768px) {
    margin-left: 0;
    .header-title {
      margin-left: 60px; /* Espaço para o botão de menu */
    }
  }
`;

export const MenuButton = styled.button`
  display: none;
  @media (max-width: 768px) {
    display: block;
    position: fixed;
    top: 10px;
    left: 10px;
    background: #1f2937;
    color: white;
    border: none;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    cursor: pointer;
    z-index: 1002;
    font-size: 20px;
    line-height: 1;
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
    background: rgba(0, 0, 0, 0.5);
    z-index: 999;
  }
`;