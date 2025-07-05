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
  //                                           👇 MUDANÇA AQUI
  const { cart = [] } = useCart() || {}; // Garante que 'cart' seja sempre um array
  const store = useStore();
  const { pathname } = useLocation();

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  if (!store) {
    return null;
  }

  const homeLink = `/loja/${store.slug}`;
  const menuLink = `/loja/${store.slug}/cardapio`;
  const cartLink = `/loja/${store.slug}/cart`;

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