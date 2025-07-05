// Arquivo: src/pages/Admin/AdminLayout/styles.js

import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

export const AdminWrapper = styled.div`
  display: flex;
  min-height: 100vh;
  background-color: #f3f4f6;
`;

export const Sidebar = styled.aside`
  width: 260px;
  background-color: #111827;
  color: #9ca3af;
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
  color: white;
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

export const ContentArea = styled.main`
  flex-grow: 1;
  margin-left: 260px;
  transition: margin-left 0.3s ease-in-out;
  
  @media (max-width: 768px) {
    margin-left: 0;
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
    background: #1f2937;
    color: white;
    border: none;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    cursor: pointer;
    z-index: 1002;
    font-size: 1rem;
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

export const NotificationBellWrapper = styled.button`
  position: fixed;
  top: 15px;
  right: 15px;
  background: white;
  border: 1px solid #e5e7eb;
  color: #4b5563;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  cursor: pointer;
  z-index: 900;
  font-size: 1.1rem;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (min-width: 769px) {
    top: 20px;
    right: 2rem;
  }
`;

export const NotificationBadge = styled.span`
  position: absolute;
  top: -5px;
  right: -5px;
  background-color: #ef4444;
  color: white;
  border-radius: 50%;
  width: 22px;
  height: 22px;
  font-size: 12px;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid white;
`;