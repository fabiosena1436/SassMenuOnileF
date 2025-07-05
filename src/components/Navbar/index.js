// Arquivo: src/components/Navbar/index.js

import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiShoppingCart, FiUser, FiHome, FiList } from 'react-icons/fi';
import { useCart } from '../../contexts/CartContext';
import { useStore } from '../../contexts/StoreContext';

import {
  NavbarContainer,
  Logo,
  NavLinks,
  NavLinkItem,
  CartIcon,
  CartCount,
  AdminLink
} from './styles';

const Navbar = () => {
  const { totalItems } = useCart();
  const store = useStore();
  const { pathname } = useLocation();

  if (!store) {
    return null; 
  }

  // Define os links com base no slug da loja
  const homeLink = `/loja/${store.slug}`;
  const menuLink = `/loja/${store.slug}/cardapio`;
  
  // <<< MUDANÇA PRINCIPAL AQUI >>>
  // Corrigimos o caminho de "cart" para "carrinho"
  const cartLink = `/loja/${store.slug}/carrinho`;

  const isActive = (path) => pathname === path;

  return (
    <NavbarContainer>
      <Link to={homeLink}>
        <Logo>
          {store.logoUrl ? (
            <img src={store.logoUrl} alt={store.storeName} />
          ) : (
            <span>{store.storeName}</span>
          )}
        </Logo>
      </Link>

      <NavLinks>
        <NavLinkItem active={isActive(homeLink)}>
          <Link to={homeLink}>
            <FiHome />
            <span>Início</span>
          </Link>
        </NavLinkItem>
        <NavLinkItem active={isActive(menuLink)}>
          <Link to={menuLink}>
            <FiList />
            <span>Cardápio</span>
          </Link>
        </NavLinkItem>
      </NavLinks>

      <div style={{ display: 'flex', alignItems: 'center' }}>
        <AdminLink to="/admin">
          <FiUser />
        </AdminLink>
        <CartIcon to={cartLink}>
          <FiShoppingCart />
          {totalItems > 0 && <CartCount>{totalItems}</CartCount>}
        </CartIcon>
      </div>
    </NavbarContainer>
  );
};

export default Navbar;