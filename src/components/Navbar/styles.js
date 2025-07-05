import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const NavbarContainer = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 5%;
  height: 70px;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
`;

export const Logo = styled.div`
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
    
    /* AQUI ESTÁ A CORREÇÃO */
    color: ${({ $active }) => ($active ? '#e53e3e' : '#4a5568')};
    font-weight: ${({ $active }) => ($active ? '600' : '500')};

    &:hover {
      color: #e53e3e;
    }

    svg {
      font-size: 1.2rem;
    }
  }
`;

export const AdminLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: 8px;
  text-decoration: none;
  color: #4a5568;
  margin-right: 20px;
  
  &:hover {
    color: #000;
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